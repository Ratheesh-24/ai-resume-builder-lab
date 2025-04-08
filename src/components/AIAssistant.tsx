
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useResumeContext } from '@/context/ResumeContext';
import { Sparkles } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

interface AIAssistantProps {
    onParse: (arg: any) => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ onParse }) => {
    const [prompt, setPrompt] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const { toast } = useToast();
    const { updateResumeData } = useResumeContext();

    const parseData = (data: string) => {
        try {
            const parsedData = JSON.parse(data);
            updateResumeData(parsedData);
            onParse(parsedData);
            toast({
                title: "Success",
                description: "Resume data updated successfully.",
            })
        } catch (error: any) {
            console.error("Error parsing data:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to update resume data.",
            })
        }
    };

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            parseData(result.result);
        } catch (error: any) {
            console.error("Error generating data:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to generate resume data.",
            })
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="col-span-2">
            <CardHeader>
                <CardTitle>AI Assistant <Sparkles className="inline-block h-4 w-4 ml-2" /></CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="prompt">Prompt</Label>
                    <Textarea
                        id="prompt"
                        placeholder="Enter your prompt here. For example: 'I am a software engineer with 5 years of experience in React and Node.js. I am looking for a job in a startup.'"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                </div>
                <Button onClick={handleGenerate} disabled={loading}>
                    {loading ? "Generating..." : "Generate"}
                </Button>
            </CardContent>
        </Card>
    );
};

export default AIAssistant;
