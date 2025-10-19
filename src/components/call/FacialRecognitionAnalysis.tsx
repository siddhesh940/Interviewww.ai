import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FacialAnalysisResult } from '@/services/facialAnalysisService';
import { AlertTriangle, Brain, Camera, Eye, Smile, TrendingUp } from 'lucide-react';

interface FacialRecognitionAnalysisProps {
  analysisResult: FacialAnalysisResult;
}

// Circular Progress Component
function CircularProgress({ 
  value, 
  max = 100, 
  size = 120, 
  strokeWidth = 8,
  color = '#4F46E5',
  showValueLabel = true}: {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  showValueLabel?: boolean;
  formatOptions?: any;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = (value / max) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          className="transition-all duration-300 ease-in-out"
        />
      </svg>
      {showValueLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold" style={{ color }}>
            {Math.round(value)}
          </span>
        </div>
      )}
    </div>
  );
}

// Emotion Pie Chart Component (simplified version)
function EmotionChart({ emotionSummary }: { emotionSummary: any }) {
  const total = emotionSummary.total_frames;
  const emotions = [
    { name: 'Happy', value: emotionSummary.happy, color: '#22c55e', emoji: '😊' },
    { name: 'Neutral', value: emotionSummary.neutral, color: '#6b7280', emoji: '😐' },
    { name: 'Nervous', value: emotionSummary.nervous, color: '#f59e0b', emoji: '😰' },
    { name: 'Confused', value: emotionSummary.confused, color: '#8b5cf6', emoji: '😕' },
    { name: 'Surprised', value: emotionSummary.surprised, color: '#06b6d4', emoji: '😮' },
    { name: 'Angry', value: emotionSummary.angry, color: '#ef4444', emoji: '😠' }
  ];

  const getPercentage = (value: number) => ((value / total) * 100).toFixed(1);

  return (
    <div className="space-y-3">
      {emotions
        .filter(emotion => emotion.value > 0)
        .sort((a, b) => b.value - a.value)
        .map((emotion) => (
          <div key={emotion.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">{emotion.emoji}</span>
              <span className="text-sm font-medium">{emotion.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{ 
                    backgroundColor: emotion.color,
                    width: `${getPercentage(emotion.value)}%`
                  }}
                />
              </div>
              <span className="text-xs text-gray-600 min-w-[35px]">
                {getPercentage(emotion.value)}%
              </span>
            </div>
          </div>
        ))}
    </div>
  );
}

// Get color based on score
function getScoreColor(score: number, isStress = false) {
  if (isStress) {
    // For stress, higher is worse
    if (score >= 70) {
      return '#ef4444'; // Red
    }
    if (score >= 40) {
      return '#f59e0b'; // Yellow
    }
    
    return '#22c55e'; // Green
  } else {
    // For confidence and engagement, higher is better
    if (score >= 75) {
      return '#22c55e'; // Green
    }
    if (score >= 60) {
      return '#f59e0b'; // Yellow
    }
    
    return '#ef4444'; // Red
  }
}

function getScoreLabel(score: number, isStress = false) {
  if (isStress) {
    if (score >= 70) {
      return 'High Stress';
    }
    if (score >= 40) {
      return 'Moderate Stress';
    }
    
    return 'Low Stress';
  } else {
    if (score >= 75) {
      return 'Excellent';
    }
    if (score >= 60) {
      return 'Good';
    }
    
    return 'Needs Improvement';
  }
}

function FacialRecognitionAnalysis({ 
  analysisResult 
}: FacialRecognitionAnalysisProps) {
  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Camera className="w-6 h-6 text-purple-600" />
        <h2 className="text-2xl font-bold text-gray-800">Facial Recognition Analysis</h2>
      </div>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Confidence Index */}
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Eye className="w-5 h-5" />
              Confidence Index
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <CircularProgress
              value={analysisResult.confidenceIndex}
              color={getScoreColor(analysisResult.confidenceIndex)}
              size={100}
            />
            <div className="mt-3 text-center">
              <p className="text-sm text-gray-600">Visual confidence level</p>
              <Badge 
                variant="secondary" 
                className="mt-1"
                style={{ 
                  backgroundColor: getScoreColor(analysisResult.confidenceIndex) + '20',
                  color: getScoreColor(analysisResult.confidenceIndex)
                }}
              >
                {getScoreLabel(analysisResult.confidenceIndex)}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Engagement Score */}
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-green-700">
              <Brain className="w-5 h-5" />
              Engagement Score
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <CircularProgress
              value={analysisResult.engagementScore}
              color={getScoreColor(analysisResult.engagementScore)}
              size={100}
            />
            <div className="mt-3 text-center">
              <p className="text-sm text-gray-600">Attentiveness level</p>
              <Badge 
                variant="secondary" 
                className="mt-1"
                style={{ 
                  backgroundColor: getScoreColor(analysisResult.engagementScore) + '20',
                  color: getScoreColor(analysisResult.engagementScore)
                }}
              >
                {getScoreLabel(analysisResult.engagementScore)}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Stress Indicator */}
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <AlertTriangle className="w-5 h-5" />
              Stress Indicator
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <CircularProgress
              value={analysisResult.stressIndicator}
              color={getScoreColor(analysisResult.stressIndicator, true)}
              size={100}
            />
            <div className="mt-3 text-center">
              <p className="text-sm text-gray-600">Stress level detected</p>
              <Badge 
                variant="secondary" 
                className="mt-1"
                style={{ 
                  backgroundColor: getScoreColor(analysisResult.stressIndicator, true) + '20',
                  color: getScoreColor(analysisResult.stressIndicator, true)
                }}
              >
                {getScoreLabel(analysisResult.stressIndicator, true)}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Facial Emotion Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smile className="w-5 h-5 text-purple-600" />
              Facial Emotion Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <EmotionChart emotionSummary={analysisResult.emotionSummary} />
            <div className="mt-4 text-sm text-gray-600">
              Total frames analyzed: {analysisResult.emotionSummary.total_frames.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        {/* Additional Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              Additional Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Eye Contact</span>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-blue-500 transition-all duration-300"
                    style={{ width: `${analysisResult.eyeContactPercentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 min-w-[35px]">
                  {analysisResult.eyeContactPercentage}%
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Smile Frequency</span>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-green-500 transition-all duration-300"
                    style={{ width: `${(analysisResult.smileFrequency / 50) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 min-w-[35px]">
                  {analysisResult.smileFrequency}%
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Head Stability</span>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-purple-500 transition-all duration-300"
                    style={{ width: `${analysisResult.headStability}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 min-w-[35px]">
                  {analysisResult.headStability}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Facial-Based Suggestions */}
      {analysisResult.suggestions.length > 0 && (
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-700">
              <Camera className="w-5 h-5" />
              Facial Expression Improvement Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {analysisResult.suggestions.map((suggestion) => (
                <div 
                  key={`${suggestion.category}-${suggestion.title}`}
                  className="p-4 rounded-xl border border-purple-200 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">{suggestion.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium text-purple-800 text-sm">{suggestion.title}</h4>
                        <Badge 
                          variant="outline" 
                          className="text-xs px-2 py-0 border-purple-300 text-purple-600"
                        >
                          {suggestion.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {suggestion.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analysis Info */}
      <div className="text-center text-sm text-gray-500 mt-6">
        Analysis completed on{' '}
        {analysisResult.analysisTimestamp 
          ? new Date(analysisResult.analysisTimestamp).toLocaleDateString() 
          : new Date().toLocaleDateString()}{' '}
        at{' '}
        {analysisResult.analysisTimestamp 
          ? new Date(analysisResult.analysisTimestamp).toLocaleTimeString()
          : new Date().toLocaleTimeString()}
      </div>
    </div>
  );
}

export default FacialRecognitionAnalysis;
