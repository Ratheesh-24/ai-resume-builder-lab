
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useResumeContext } from "@/context/ResumeContext";
import { PlusCircle, Eye, FileText, Download } from "lucide-react";
import ResumePreview from "@/components/ResumePreview";
import SkillsForm from "@/components/forms/SkillsForm";
import ExperienceForm from "@/components/forms/ExperienceForm";
import EducationForm from "@/components/forms/EducationForm";
import ProjectsForm from "@/components/forms/ProjectsForm";
import AIAssistant from "@/components/AIAssistant";

const Index = () => {
  const { resumeData, updateResumeData } = useResumeContext();
  const [activeTab, setActiveTab] = useState("personal");
  const [showPreview, setShowPreview] = useState(false);

  // Function to handle basic info changes
  const handleBasicInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateResumeData({
      basicInfo: {
        ...resumeData.basicInfo,
        [name]: value,
      },
    });
  };

  // Function to add new experience
  const addExperience = () => {
    const newExperience = {
      id: crypto.randomUUID(),
      company: '',
      position: '',
      startDate: '',
      description: '',
    };
    
    updateResumeData({
      experience: [...resumeData.experience, newExperience],
    });
  };

  // Function to add new education
  const addEducation = () => {
    const newEducation = {
      id: crypto.randomUUID(),
      institution: '',
      degree: '',
      startDate: '',
      description: '',
    };
    
    updateResumeData({
      education: [...resumeData.education, newEducation],
    });
  };

  // Function to parse AI response
  const handleAIParse = (data: any) => {
    // This function would be called when AI generates resume data
    console.log("AI generated data:", data);
    setActiveTab("personal");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">IT Resume Builder</h1>
          <div className="flex items-center space-x-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[90%] sm:w-[600px] overflow-y-auto">
                <div className="mt-8 h-full">
                  <ResumePreview />
                </div>
              </SheetContent>
            </Sheet>
            <Button size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            <AIAssistant onParse={handleAIParse} />

            <Card>
              <CardContent className="p-0">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="w-full grid grid-cols-5">
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                    <TabsTrigger value="experience">Experience</TabsTrigger>
                    <TabsTrigger value="education">Education</TabsTrigger>
                    <TabsTrigger value="projects">Projects</TabsTrigger>
                    <TabsTrigger value="skills">Skills</TabsTrigger>
                  </TabsList>

                  {/* Personal Info Tab */}
                  <TabsContent value="personal" className="p-6 space-y-6">
                    <h2 className="text-xl font-semibold">Personal Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          value={resumeData.basicInfo.name || ''} 
                          onChange={handleBasicInfoChange} 
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          value={resumeData.basicInfo.email || ''} 
                          onChange={handleBasicInfoChange} 
                          placeholder="john.doe@example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          value={resumeData.basicInfo.phone || ''} 
                          onChange={handleBasicInfoChange} 
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input 
                          id="location" 
                          name="location" 
                          value={resumeData.basicInfo.location || ''} 
                          onChange={handleBasicInfoChange} 
                          placeholder="New York, NY"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input 
                          id="linkedin" 
                          name="linkedin" 
                          value={resumeData.basicInfo.linkedin || ''} 
                          onChange={handleBasicInfoChange} 
                          placeholder="linkedin.com/in/johndoe"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="github">GitHub</Label>
                        <Input 
                          id="github" 
                          name="github" 
                          value={resumeData.basicInfo.github || ''} 
                          onChange={handleBasicInfoChange} 
                          placeholder="github.com/johndoe"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="summary">Professional Summary</Label>
                      <Textarea 
                        id="summary" 
                        name="summary" 
                        value={resumeData.summary || ''} 
                        onChange={(e) => updateResumeData({ summary: e.target.value })} 
                        placeholder="Experienced software engineer with expertise in..."
                        className="min-h-[120px]"
                      />
                    </div>
                  </TabsContent>

                  {/* Experience Tab */}
                  <TabsContent value="experience" className="p-6 space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold">Work Experience</h2>
                      <Button onClick={addExperience} variant="outline" size="sm">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Experience
                      </Button>
                    </div>
                    
                    <div className="space-y-6">
                      {resumeData.experience.length > 0 ? (
                        resumeData.experience.map((exp) => (
                          <ExperienceForm key={exp.id} id={exp.id} />
                        ))
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <FileText className="mx-auto h-12 w-12 text-gray-400" />
                          <h3 className="mt-2 text-sm font-semibold">No experience added</h3>
                          <p className="mt-1 text-sm">Get started by adding your work experience.</p>
                          <div className="mt-6">
                            <Button onClick={addExperience}>
                              <PlusCircle className="mr-2 h-4 w-4" />
                              Add Experience
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  {/* Education Tab */}
                  <TabsContent value="education" className="p-6 space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold">Education</h2>
                      <Button onClick={addEducation} variant="outline" size="sm">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Education
                      </Button>
                    </div>
                    
                    <div className="space-y-6">
                      {resumeData.education.length > 0 ? (
                        resumeData.education.map((edu) => (
                          <EducationForm key={edu.id} id={edu.id} />
                        ))
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <FileText className="mx-auto h-12 w-12 text-gray-400" />
                          <h3 className="mt-2 text-sm font-semibold">No education added</h3>
                          <p className="mt-1 text-sm">Get started by adding your education history.</p>
                          <div className="mt-6">
                            <Button onClick={addEducation}>
                              <PlusCircle className="mr-2 h-4 w-4" />
                              Add Education
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  {/* Projects Tab */}
                  <TabsContent value="projects" className="p-6">
                    <ProjectsForm formId="projects" />
                  </TabsContent>

                  {/* Skills Tab */}
                  <TabsContent value="skills" className="p-6">
                    <SkillsForm />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - Preview */}
          <div className="hidden lg:block">
            <div className="sticky top-8">
              <h2 className="text-xl font-semibold mb-4">Resume Preview</h2>
              <div className="bg-white rounded-lg shadow">
                <ResumePreview />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
