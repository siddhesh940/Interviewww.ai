interface TranscriptEntry {
  speaker: string;
  text: string;
  timestamp?: string;
}

interface SentimentScore {
  overall: number;
  positive: number;
  neutral: number;
  negative: number;
}

interface SoftSkills {
  teamwork: number;
  adaptability: number;
  empathy: number;
  communication: number;
}

interface AnalysisScores {
  clarity: number;
  confidence: number;
  overallImpression: number;
}

interface Weakness {
  area: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
}

interface Recommendation {
  title: string;
  description: string;
  category: 'tone' | 'confidence' | 'structure' | 'clarity' | 'technical';
}

interface Strength {
  area: string;
  description: string;
}

export interface SentimentAnalysisResult {
  sentimentScore: SentimentScore;
  softSkills: SoftSkills;
  analysisScores: AnalysisScores;
  weaknesses: Weakness[];
  recommendations: Recommendation[];
  strengths: Strength[];
  hesitationCount: number;
  averageResponseTime: number;
}

export const analyzeSentiment = (transcript: string | TranscriptEntry[]): SentimentAnalysisResult => {
  let text = '';
  
  if (Array.isArray(transcript)) {
    text = transcript
      .filter(entry => entry.speaker.toLowerCase() === 'candidate' || entry.speaker.toLowerCase() === 'user')
      .map(entry => entry.text)
      .join(' ');
  } else {
    text = transcript;
  }

  const lowerText = text.toLowerCase();
  
  // Sentiment Analysis
  const positiveWords = ['excellent', 'great', 'good', 'love', 'like', 'best', 'amazing', 'wonderful', 'fantastic', 'yes', 'definitely', 'absolutely', 'confident', 'experienced', 'skilled', 'passionate', 'excited', 'successful', 'achieved', 'accomplished'];
  const negativeWords = ['bad', 'terrible', 'hate', 'worst', 'difficult', 'problem', 'issue', 'no', 'never', 'cannot', 'failed', 'struggle', 'confused', 'unsure', 'unfortunately', 'worried'];
  const hesitationWords = ['um', 'uh', 'hmm', 'well', 'like', 'you know', 'i mean', 'kind of', 'sort of', 'maybe', 'perhaps', 'i think', 'i guess'];

  const words = lowerText.split(/\s+/);
  const wordCount = words.length;

  let positiveCount = 0;
  let negativeCount = 0;
  let hesitationCount = 0;

  positiveWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = lowerText.match(regex);
    if (matches) {positiveCount += matches.length;}
  });

  negativeWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = lowerText.match(regex);
    if (matches) {negativeCount += matches.length;}
  });

  hesitationWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = lowerText.match(regex);
    if (matches) {hesitationCount += matches.length;}
  });

  const positivePercentage = Math.min(95, Math.round((positiveCount / wordCount) * 100 * 10));
  const negativePercentage = Math.min(30, Math.round((negativeCount / wordCount) * 100 * 10));
  const neutralPercentage = 100 - positivePercentage - negativePercentage;

  const sentimentScore: SentimentScore = {
    overall: Math.max(30, Math.min(95, 50 + positivePercentage - negativePercentage)),
    positive: positivePercentage,
    neutral: Math.max(0, neutralPercentage),
    negative: negativePercentage
  };

  // Soft Skills Analysis
  const teamworkIndicators = ['team', 'collaborate', 'together', 'group', 'cooperation', 'we'];
  const adaptabilityIndicators = ['adapt', 'flexible', 'change', 'learn', 'new', 'different'];
  const empathyIndicators = ['understand', 'feel', 'perspective', 'others', 'listen', 'care'];
  const communicationIndicators = ['explain', 'communicate', 'discuss', 'share', 'present', 'clarify'];

  const calculateSkillScore = (indicators: string[]) => {
    let count = 0;
    indicators.forEach(indicator => {
      const regex = new RegExp(`\\b${indicator}\\b`, 'gi');
      const matches = lowerText.match(regex);
      if (matches) {count += matches.length;}
    });
    
return Math.min(95, Math.max(40, 55 + count * 8));
  };

  const softSkills: SoftSkills = {
    teamwork: calculateSkillScore(teamworkIndicators),
    adaptability: calculateSkillScore(adaptabilityIndicators),
    empathy: calculateSkillScore(empathyIndicators),
    communication: calculateSkillScore(communicationIndicators)
  };

  // Clarity & Confidence Analysis
  const sentenceCount = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  const avgWordsPerSentence = wordCount / Math.max(1, sentenceCount);
  
  const clarityScore = Math.min(95, Math.max(35, 
    70 - (hesitationCount * 2) + (avgWordsPerSentence > 15 && avgWordsPerSentence < 30 ? 10 : -10)
  ));

  const confidenceScore = Math.min(95, Math.max(35,
    75 - (hesitationCount * 3) + (positiveCount * 2) - (negativeCount * 2)
  ));

  const analysisScores: AnalysisScores = {
    clarity: clarityScore,
    confidence: confidenceScore,
    overallImpression: Math.round((sentimentScore.overall + clarityScore + confidenceScore + 
      (softSkills.teamwork + softSkills.adaptability + softSkills.empathy + softSkills.communication) / 4) / 4)
  };

  // Generate Weaknesses
  const weaknesses: Weakness[] = [];
  
  if (hesitationCount > 15) {
    weaknesses.push({
      area: 'Speech Fluency',
      description: `Detected ${hesitationCount} hesitation markers (um, uh, etc.). Try to reduce filler words by pausing briefly instead.`,
      severity: 'high'
    });
  }

  if (clarityScore < 60) {
    weaknesses.push({
      area: 'Response Clarity',
      description: 'Your answers could be more structured. Use the STAR method (Situation, Task, Action, Result) for behavioral questions.',
      severity: 'medium'
    });
  }

  if (confidenceScore < 60) {
    weaknesses.push({
      area: 'Confidence Level',
      description: 'Your tone suggests uncertainty. Practice speaking with more conviction and using definitive language.',
      severity: 'high'
    });
  }

  if (softSkills.communication < 60) {
    weaknesses.push({
      area: 'Communication Skills',
      description: 'Focus on explaining your ideas more clearly. Break down complex concepts into simpler terms.',
      severity: 'medium'
    });
  }

  // Generate Strengths
  const strengths: Strength[] = [];

  if (sentimentScore.overall >= 70) {
    strengths.push({
      area: 'Positive Attitude',
      description: 'You maintained a positive and enthusiastic tone throughout the interview.'
    });
  }

  if (softSkills.teamwork >= 70) {
    strengths.push({
      area: 'Teamwork Emphasis',
      description: 'You effectively demonstrated your collaborative abilities and team-oriented mindset.'
    });
  }

  if (clarityScore >= 75) {
    strengths.push({
      area: 'Clear Communication',
      description: 'Your responses were well-structured and easy to follow.'
    });
  }

  if (confidenceScore >= 75) {
    strengths.push({
      area: 'Strong Confidence',
      description: 'You spoke with confidence and conviction, which makes a great impression.'
    });
  }

  // Generate Recommendations
  const recommendations: Recommendation[] = [];

  if (hesitationCount > 10) {
    recommendations.push({
      title: 'Reduce Filler Words',
      description: 'Practice pausing instead of using "um" or "uh". Record yourself and listen back to identify patterns. Try the "pause and breathe" technique.',
      category: 'clarity'
    });
  }

  if (confidenceScore < 70) {
    recommendations.push({
      title: 'Build Your Confidence',
      description: 'Use power poses before interviews, speak slightly louder than normal, and replace uncertain phrases like "I think" with "I believe" or "In my experience".',
      category: 'confidence'
    });
  }

  if (avgWordsPerSentence < 10 || avgWordsPerSentence > 40) {
    recommendations.push({
      title: 'Optimize Answer Length',
      description: 'Aim for 2-3 minute responses. Practice the STAR method to structure your answers effectively without rambling or being too brief.',
      category: 'structure'
    });
  }

  if (softSkills.communication < 70) {
    recommendations.push({
      title: 'Enhance Communication Clarity',
      description: 'Use analogies and examples to illustrate your points. Practice explaining technical concepts to non-technical people.',
      category: 'clarity'
    });
  }

  recommendations.push({
    title: 'Practice Active Listening',
    description: 'Take a moment to process questions before answering. This shows thoughtfulness and helps you provide more relevant responses.',
    category: 'structure'
  });

  recommendations.push({
    title: 'Maintain Eye Contact & Body Language',
    description: 'In video interviews, look at the camera (not the screen). Sit up straight and use hand gestures naturally to emphasize points.',
    category: 'tone'
  });

  const avgResponseTime = Math.max(2, Math.min(8, 3 + (hesitationCount * 0.1)));

  return {
    sentimentScore,
    softSkills,
    analysisScores,
    weaknesses,
    recommendations,
    strengths,
    hesitationCount,
    averageResponseTime: Math.round(avgResponseTime * 10) / 10
  };
};
