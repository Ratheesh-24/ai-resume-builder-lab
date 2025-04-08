import React from 'react';
import { useResumeContext } from '@/context/ResumeContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Trash2 } from 'lucide-react';
import { Education } from '@/types/resume';
import { useToast } from "@/components/ui/use-toast";

interface EducationFormProps {
  id: string;
}

const EducationForm: React.FC<EducationFormProps> = ({ id }) => {
  const { resumeData, updateResumeData } = useResumeContext();
  const { toast } = useToast();

  const education = resumeData.education.find((edu) => edu.id === id) || {
    id: '',
    institution: '',
    degree: '',
    startDate: '',
    endDate: '',
    description: '',
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateResumeData({
      ...resumeData,
      education: resumeData.education.map((edu) =>
        edu.id === id ? { ...edu, [name]: value } : edu
      ),
    });
  };

  const handleRemove = () => {
    updateResumeData({
      ...resumeData,
      education: resumeData.education.filter((edu) => edu.id !== id),
    });
    toast({
      title: "Success",
      description: "Education removed successfully.",
    })
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Education</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="institution">Institution</Label>
            <Input
              type="text"
              id="institution"
              name="institution"
              value={education.institution}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="degree">Degree</Label>
            <Input
              type="text"
              id="degree"
              name="degree"
              value={education.degree}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              type="text"
              id="startDate"
              name="startDate"
              placeholder="MM/YYYY"
              value={education.startDate}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="endDate">End Date</Label>
            <Input
              type="text"
              id="endDate"
              name="endDate"
              placeholder="MM/YYYY or Present"
              value={education.endDate}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={education.description}
            onChange={handleChange}
            className="resize-none"
          />
        </div>
        <Button
          type="button"
          variant="destructive"
          size="sm"
          onClick={handleRemove}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Remove
        </Button>
      </CardContent>
    </Card>
  );
};

export default EducationForm;

