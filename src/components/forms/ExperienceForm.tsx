import React, { useState } from 'react';
import { useResumeContext } from '@/context/ResumeContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircle, Trash2, Sparkles } from 'lucide-react';
import { Experience } from '@/types/resume';
import { formatDate } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";

interface ExperienceFormProps {
  id: string;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ id }) => {
  const { resumeData, updateResumeData } = useResumeContext();
  const experience = resumeData.experience.find((exp) => exp.id === id);
  const [current, setCurrent] = useState(experience?.current || false);
    const { toast } = useToast();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateResumeData({
      ...resumeData,
      experience: resumeData.experience.map((exp) =>
        exp.id === id ? { ...exp, [name]: value } : exp
      ),
    });
  };

  const handleCurrentChange = (checked: boolean) => {
    setCurrent(checked);
    updateResumeData({
      ...resumeData,
      experience: resumeData.experience.map((exp) =>
        exp.id === id ? { ...exp, current: checked } : exp
      ),
    });
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    updateResumeData({
      ...resumeData,
      experience: resumeData.experience.map((exp) =>
        exp.id === id ? { ...exp, startDate: value } : exp
      ),
    });
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    updateResumeData({
      ...resumeData,
      experience: resumeData.experience.map((exp) =>
        exp.id === id ? { ...exp, endDate: value } : exp
      ),
    });
  };

  const removeExperience = () => {
    updateResumeData({
      ...resumeData,
      experience: resumeData.experience.filter((exp) => exp.id !== id),
    });
      toast({
          title: "Experience Removed",
          description: "Your experience has been removed from your resume.",
      })
  };

  if (!experience) {
    return null;
  }

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>
          Experience at {experience.company}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="company">Company</Label>
            <Input
              type="text"
              id="company"
              name="company"
              value={experience.company}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="position">Position</Label>
            <Input
              type="text"
              id="position"
              name="position"
              value={experience.position}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              type="date"
              id="startDate"
              name="startDate"
              value={formatDate(experience.startDate)}
              onChange={handleStartDateChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="endDate">End Date</Label>
            <Input
              type="date"
              id="endDate"
              name="endDate"
              value={formatDate(experience.endDate)}
              onChange={handleEndDateChange}
              disabled={current}
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="current"
            checked={current}
            onCheckedChange={handleCurrentChange}
          />
          <Label htmlFor="current">Currently working here</Label>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={experience.description}
            onChange={handleChange}
            className="min-h-[80px]"
          />
        </div>
        <Button
          variant="destructive"
          onClick={removeExperience}
          className="w-fit"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Remove Experience
        </Button>
      </CardContent>
    </Card>
  );
};

export default ExperienceForm;
