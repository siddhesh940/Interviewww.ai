import { analyzeFacialExpressions } from '@/services/facialAnalysisService';
import { ResponseService } from '@/services/responses.service';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { call_id } = await request.json();

    if (!call_id) {
      return NextResponse.json(
        { error: 'call_id is required' },
        { status: 400 }
      );
    }

    // Perform facial analysis
    const facialAnalysisResult = analyzeFacialExpressions();

    // Update the response with facial analysis data
    try {
      await ResponseService.updateResponse(
        { facial_analysis: facialAnalysisResult },
        call_id
      );
    } catch (updateError) {
      console.error('Failed to update response with facial analysis:', updateError);
      // Continue even if database update fails, return the analysis result
    }

    return NextResponse.json({
      success: true,
      data: facialAnalysisResult,
      message: 'Facial analysis completed successfully'
    });

  } catch (error) {
    console.error('Error in facial analysis:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error during facial analysis',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const call_id = searchParams.get('call_id');

    if (!call_id) {
      return NextResponse.json(
        { error: 'call_id parameter is required' },
        { status: 400 }
      );
    }

    // Get the response data to check if facial analysis exists
    try {
      const responseData = await ResponseService.getResponseByCallId(call_id);
      
      if (!responseData) {
        return NextResponse.json(
          { error: 'Response not found for the given call_id' },
          { status: 404 }
        );
      }

      // If facial analysis doesn't exist, generate it
      if (!responseData.facial_analysis) {
        const facialAnalysisResult = analyzeFacialExpressions();
        
        // Update the response with new facial analysis
        await ResponseService.updateResponse(
          { facial_analysis: facialAnalysisResult },
          call_id
        );

        return NextResponse.json({
          success: true,
          data: facialAnalysisResult,
          generated: true,
          message: 'Facial analysis generated and saved successfully'
        });
      }

      // Return existing facial analysis
      return NextResponse.json({
        success: true,
        data: responseData.facial_analysis,
        generated: false,
        message: 'Existing facial analysis retrieved successfully'
      });

    } catch (serviceError) {
      console.error('Error accessing response data:', serviceError);
      
      return NextResponse.json(
        { error: 'Failed to access response data' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error retrieving facial analysis:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
