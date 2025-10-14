import { SentimentAnalysisResult } from "@/services/sentimentAnalysisService";
import { CircularProgress } from "@nextui-org/react";

interface SentimentAnalysisProps {
  analysisResult: SentimentAnalysisResult;
}

export default function SentimentAnalysisSection({ analysisResult }: SentimentAnalysisProps) {
  const getSentimentColor = (score: number) => {
    if (score >= 70) {return "text-green-500";}
    if (score >= 50) {return "text-yellow-500";}
    
return "text-red-500";
  };

  const getSentimentLabel = (score: number) => {
    if (score >= 70) {return "Positive";}
    if (score >= 50) {return "Neutral";}
    
return "Negative";
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) {return "stroke-green-500";}
    if (score >= 60) {return "stroke-yellow-500";}
    
return "stroke-red-500";
  };

  const getTrackColor = (score: number) => {
    if (score >= 75) {return "stroke-green-500/10";}
    if (score >= 60) {return "stroke-yellow-500/10";}
    
return "stroke-red-500/10";
  };

  return (
    <div className="bg-slate-200 rounded-2xl min-h-[120px] p-4 px-5 my-3">
      <p className="font-semibold my-2 mb-4">Sentiment Analysis</p>
      
      {/* Sentiment Score */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="flex flex-col gap-3 text-sm p-4 rounded-2xl bg-slate-50">
          <div className="flex flex-row gap-2 align-middle">
            <CircularProgress
              classNames={{
                svg: "w-20 h-20 drop-shadow-md",
                indicator: getScoreColor(analysisResult.sentimentScore.overall),
                track: getTrackColor(analysisResult.sentimentScore.overall),
                value: "text-xl font-semibold text-gray-700",
              }}
              value={analysisResult.sentimentScore.overall}
              strokeWidth={4}
              showValueLabel={true}
              formatOptions={{ signDisplay: "never" }}
            />
            <div className="flex flex-col justify-center">
              <p className="font-medium text-lg">Overall Sentiment</p>
              <p className={`font-semibold ${getSentimentColor(analysisResult.sentimentScore.overall)}`}>
                {getSentimentLabel(analysisResult.sentimentScore.overall)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 text-sm p-4 rounded-2xl bg-slate-50">
          <div className="flex flex-row gap-2 align-middle">
            <CircularProgress
              classNames={{
                svg: "w-20 h-20 drop-shadow-md",
                indicator: getScoreColor(analysisResult.analysisScores.clarity),
                track: getTrackColor(analysisResult.analysisScores.clarity),
                value: "text-xl font-semibold text-gray-700",
              }}
              value={analysisResult.analysisScores.clarity}
              strokeWidth={4}
              showValueLabel={true}
              formatOptions={{ signDisplay: "never" }}
            />
            <div className="flex flex-col justify-center">
              <p className="font-medium text-lg">Clarity Score</p>
              <p className="text-gray-600 text-sm">Speech clarity</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 text-sm p-4 rounded-2xl bg-slate-50">
          <div className="flex flex-row gap-2 align-middle">
            <CircularProgress
              classNames={{
                svg: "w-20 h-20 drop-shadow-md",
                indicator: getScoreColor(analysisResult.analysisScores.confidence),
                track: getTrackColor(analysisResult.analysisScores.confidence),
                value: "text-xl font-semibold text-gray-700",
              }}
              value={analysisResult.analysisScores.confidence}
              strokeWidth={4}
              showValueLabel={true}
              formatOptions={{ signDisplay: "never" }}
            />
            <div className="flex flex-col justify-center">
              <p className="font-medium text-lg">Confidence Score</p>
              <p className="text-gray-600 text-sm">Speaking confidence</p>
            </div>
          </div>
        </div>
      </div>

      {/* Soft Skills Scores */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-3">Soft Skills Assessment</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col gap-2 text-sm p-3 rounded-xl bg-slate-50">
            <div className="flex items-center justify-between">
              <p className="font-medium">Teamwork</p>
              <span className={`font-bold ${getSentimentColor(analysisResult.softSkills.teamwork)}`}>
                {analysisResult.softSkills.teamwork}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  analysisResult.softSkills.teamwork >= 75 ? 'bg-green-500' :
                  analysisResult.softSkills.teamwork >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${analysisResult.softSkills.teamwork}%` }}
               />
            </div>
          </div>

          <div className="flex flex-col gap-2 text-sm p-3 rounded-xl bg-slate-50">
            <div className="flex items-center justify-between">
              <p className="font-medium">Adaptability</p>
              <span className={`font-bold ${getSentimentColor(analysisResult.softSkills.adaptability)}`}>
                {analysisResult.softSkills.adaptability}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  analysisResult.softSkills.adaptability >= 75 ? 'bg-green-500' :
                  analysisResult.softSkills.adaptability >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${analysisResult.softSkills.adaptability}%` }}
               />
            </div>
          </div>

          <div className="flex flex-col gap-2 text-sm p-3 rounded-xl bg-slate-50">
            <div className="flex items-center justify-between">
              <p className="font-medium">Empathy</p>
              <span className={`font-bold ${getSentimentColor(analysisResult.softSkills.empathy)}`}>
                {analysisResult.softSkills.empathy}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  analysisResult.softSkills.empathy >= 75 ? 'bg-green-500' :
                  analysisResult.softSkills.empathy >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${analysisResult.softSkills.empathy}%` }}
               />
            </div>
          </div>

          <div className="flex flex-col gap-2 text-sm p-3 rounded-xl bg-slate-50">
            <div className="flex items-center justify-between">
              <p className="font-medium">Communication</p>
              <span className={`font-bold ${getSentimentColor(analysisResult.softSkills.communication)}`}>
                {analysisResult.softSkills.communication}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  analysisResult.softSkills.communication >= 75 ? 'bg-green-500' :
                  analysisResult.softSkills.communication >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${analysisResult.softSkills.communication}%` }}
               />
            </div>
          </div>
        </div>
      </div>

      {/* Overall Impression */}
      <div className="flex flex-col gap-3 text-sm p-4 rounded-2xl bg-slate-50">
        <div className="flex flex-row gap-2 align-middle">
          <CircularProgress
            classNames={{
              svg: "w-24 h-24 drop-shadow-md",
              indicator: getScoreColor(analysisResult.analysisScores.overallImpression),
              track: getTrackColor(analysisResult.analysisScores.overallImpression),
              value: "text-2xl font-semibold text-gray-700",
            }}
            value={analysisResult.analysisScores.overallImpression}
            strokeWidth={4}
            showValueLabel={true}
            formatOptions={{ signDisplay: "never" }}
          />
          <div className="flex flex-col justify-center">
            <p className="font-medium text-xl">Overall Impression Score</p>
            <p className="text-gray-600">Combined assessment of all factors</p>
            <div className="flex gap-4 mt-2 text-sm">
              <span>Hesitation Count: <strong>{analysisResult.hesitationCount}</strong></span>
              <span>Avg Response Time: <strong>{analysisResult.averageResponseTime}s</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
