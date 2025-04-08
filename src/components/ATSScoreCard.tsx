import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertCircle, CheckCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Props {
    score: number;
    positiveKeywords: string[];
    negativeKeywords: string[];
}

const ATSScoreCard = ({ score, positiveKeywords, negativeKeywords }: Props) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { toast } = useToast();

    const handleCopyKeywords = (keywords: string[], type: string) => {
        navigator.clipboard.writeText(keywords.join(', '))
            .then(() => {
                toast({
                    title: `${type === 'positive' ? 'Positive' : 'Negative'} keywords copied!`,
                    description: 'Keywords copied to clipboard',
                });
            })
            .catch(err => {
                toast({
                    variant: 'destructive',
                    title: 'Failed to copy keywords!',
                    description: err.message,
                });
            });
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    ATS Score: {score}%
                    {score >= 70 ? (
                        <CheckCircle className="text-green-500 h-6 w-6" />
                    ) : (
                        <AlertCircle className="text-red-500 h-6 w-6" />
                    )}
                </CardTitle>
                <CardDescription>
                    {score >= 70
                        ? "Your resume is likely to pass the ATS screening."
                        : "Your resume may not pass the ATS screening. Consider improving it."}
                </CardDescription>
                <Progress value={score} className="mt-2" />
            </CardHeader>
            <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                    <Button variant="outline" size="sm" onClick={() => {
                        setIsExpanded(!isExpanded);
                    }}>
                        {isExpanded ? "Hide Keywords" : "Show Keywords"}
                    </Button>
                </div>

                {isExpanded && (
                    <>
                        <div className="mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-sm font-medium">Positive Keywords:</h3>
                                <Button variant="secondary" size="xs" onClick={() => handleCopyKeywords(positiveKeywords, 'positive')}>
                                    Copy
                                </Button>
                            </div>
                            {positiveKeywords.length > 0 ? (
                                <ul className="list-disc pl-5 text-sm">
                                    {positiveKeywords.map((keyword, index) => (
                                        <li key={index}>{keyword}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-muted-foreground">No positive keywords found.</p>
                            )}
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-sm font-medium">Negative Keywords:</h3>
                                <Button variant="secondary" size="xs" onClick={() => handleCopyKeywords(negativeKeywords, 'negative')}>
                                    Copy
                                </Button>
                            </div>
                            {negativeKeywords.length > 0 ? (
                                <ul className="list-disc pl-5 text-sm">
                                    {negativeKeywords.map((keyword, index) => (
                                        <li key={index}>{keyword}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-muted-foreground">No negative keywords found.</p>
                            )}
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
};

export default ATSScoreCard;
