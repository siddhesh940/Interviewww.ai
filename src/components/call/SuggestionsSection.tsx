import { SentimentAnalysisResult } from "@/services/sentimentAnalysisService";
import { AlertTriangle, CheckCircle, Lightbulb, TrendingUp, XCircle } from "lucide-react";

interface SuggestionsProps {
  analysisResult: SentimentAnalysisResult;
}

export default function SuggestionsSection({ analysisResult }: SuggestionsProps) {
  const getSeverityIcon = (severity: 'high' | 'medium' | 'low') => {
    switch (severity) {
      case 'high':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'medium':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'low':
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getSeverityColor = (severity: 'high' | 'medium' | 'low') => {
    switch (severity) {
      case 'high':
        return 'border-red-200 bg-red-50';
      case 'medium':
        return 'border-yellow-200 bg-yellow-50';
      case 'low':
        return 'border-orange-200 bg-orange-50';
      default:
        return 'border-yellow-200 bg-yellow-50';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'tone':
        return '🎵';
      case 'confidence':
        return '💪';
      case 'structure':
        return '🏗️';
      case 'clarity':
        return '🔍';
      case 'technical':
        return '⚙️';
      default:
        return '💡';
    }
  };

  return (
    <div className="bg-slate-200 rounded-2xl min-h-[120px] p-4 px-5 my-3">
      <p className="font-semibold my-2 mb-4">Performance Insights & Suggestions</p>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Strengths Section */}
        {analysisResult.strengths.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-lg text-green-700">Strengths Identified</h3>
            </div>
            <div className="space-y-3">
              {analysisResult.strengths.map((strength, index) => (
                <div 
                  key={index}
                  className="p-3 rounded-xl border border-green-200 bg-green-50"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-green-800">{strength.area}</h4>
                      <p className="text-sm text-green-700 mt-1">{strength.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Weaknesses Section */}
        {analysisResult.weaknesses.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <h3 className="font-semibold text-lg text-orange-700">Areas for Improvement</h3>
            </div>
            <div className="space-y-3">
              {analysisResult.weaknesses.map((weakness, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded-xl border ${getSeverityColor(weakness.severity)}`}
                >
                  <div className="flex items-start gap-3">
                    {getSeverityIcon(weakness.severity)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-800">{weakness.area}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          weakness.severity === 'high' ? 'bg-red-100 text-red-700' :
                          weakness.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {weakness.severity.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{weakness.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Recommendations Section */}
      {analysisResult.recommendations.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-lg text-blue-700">Personalized Recommendations</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysisResult.recommendations.map((recommendation, index) => (
              <div 
                key={index}
                className="p-4 rounded-xl border border-blue-200 bg-blue-50"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{getCategoryIcon(recommendation.category)}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium text-blue-800">{recommendation.title}</h4>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 capitalize">
                        {recommendation.category}
                      </span>
                    </div>
                    <p className="text-sm text-blue-700 leading-relaxed">{recommendation.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-200">
        <h3 className="font-semibold text-lg mb-3">Quick Performance Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <p className="text-2xl font-bold text-indigo-600">
              {analysisResult.sentimentScore.overall}%
            </p>
            <p className="text-gray-600">Overall Sentiment</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {analysisResult.strengths.length}
            </p>
            <p className="text-gray-600">Strengths Found</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">
              {analysisResult.weaknesses.length}
            </p>
            <p className="text-gray-600">Areas to Improve</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              {analysisResult.recommendations.length}
            </p>
            <p className="text-gray-600">Recommendations</p>
          </div>
        </div>
      </div>

      {/* No data fallback */}
      {analysisResult.strengths.length === 0 && 
       analysisResult.weaknesses.length === 0 && 
       analysisResult.recommendations.length === 0 && (
        <div className="text-center py-8">
          <Lightbulb className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">Analysis complete. More detailed insights will be available with longer interviews.</p>
        </div>
      )}
    </div>
  );
}
