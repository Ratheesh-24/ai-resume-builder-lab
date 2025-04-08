import React, { useState } from 'react';
import { useResumeContext } from '@/context/ResumeContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, X } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface SkillsFormProps { }

const SkillsForm: React.FC<SkillsFormProps> = () => {
  const { resumeData, updateResumeData } = useResumeContext();
  const [newSkill, setNewSkill] = useState('');
  const { toast } = useToast();

  const handleAddSkill = () => {
    if (newSkill.trim() !== '') {
      const updatedSkills = [...(resumeData.skills || []), newSkill.trim()];
      updateResumeData({ skills: updatedSkills });
      setNewSkill('');
      toast({
        title: "Skill Added",
        description: "Your skill has been successfully added to your resume.",
      })
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updatedSkills = (resumeData.skills || []).filter(skill => skill !== skillToRemove);
    updateResumeData({ skills: updatedSkills });
    toast({
      title: "Skill Removed",
      description: "Your skill has been successfully removed from your resume.",
    })
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex gap-2">
          <Input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a skill"
          />
          <Button type="button" onClick={handleAddSkill} variant="outline">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {(resumeData.skills || []).map((skill, index) => (
            <Badge key={index} variant="secondary">
              {skill}
              <X
                className="ml-1 h-3 w-3 cursor-pointer"
                onClick={() => handleRemoveSkill(skill)}
              />
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsForm;
