
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useResumeContext } from "@/context/ResumeContext";
import { PlusCircle, Eye, FileText, Download, GraduationCap, Briefcase, Code, Laptop, User, FileCheck } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FileCheck className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 text-transparent bg-clip-text">Pro Resume Builder</h1>
          </div>
          <div className="flex items-center space-x-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2 hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-colors">
                  <Eye className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  Preview
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[90%] sm:w-[600px] overflow-y-auto border-l border-gray-200 dark:border-gray-800">
                <div className="mt-8 h-full">
                  <ResumePreview />
                </div>
              </SheetContent>
            </Sheet>
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
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
            <Card className="overflow-hidden shadow-lg border-gray-200 dark:border-gray-800">
              <CardContent className="p-5">
                <AIAssistant onParse={handleAIParse} />
              </CardContent>
            </Card>

            <Card className="overflow-hidden shadow-lg border-gray-200 dark:border-gray-800">
              <CardContent className="p-0">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="w-full grid grid-cols-5 bg-gray-100 dark:bg-gray-800 p-1 rounded-t-lg">
                    <TabsTrigger 
                      value="personal" 
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow-sm flex items-center gap-2"
                    >
                      <User className="h-4 w-4" />
                      <span className="hidden sm:inline">Personal</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="experience" 
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow-sm flex items-center gap-2"
                    >
                      <Briefcase className="h-4 w-4" />
                      <span className="hidden sm:inline">Experience</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="education" 
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow-sm flex items-center gap-2"
                    >
                      <GraduationCap className="h-4 w-4" />
                      <span className="hidden sm:inline">Education</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="projects" 
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow-sm flex items-center gap-2"
                    >
                      <Code className="h-4 w-4" />
                      <span className="hidden sm:inline">Projects</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="skills" 
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow-sm flex items-center gap-2"
                    >
                      <Laptop className="h-4 w-4" />
                      <span className="hidden sm:inline">Skills</span>
                    </TabsTrigger>
                  </TabsList>

                  {/* Personal Info Tab */}
                  <TabsContent value="personal" className="p-6 space-y-6 bg-white dark:bg-gray-900 rounded-b-lg">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                      <User className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      Personal Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Full Name</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          value={resumeData.basicInfo.name || ''} 
                          onChange={handleBasicInfoChange} 
                          placeholder="John Doe"
                          className="border-gray-300 dark:border-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          value={resumeData.basicInfo.email || ''} 
                          onChange={handleBasicInfoChange} 
                          placeholder="john.doe@example.com"
                          className="border-gray-300 dark:border-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300">Phone</Label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          value={resumeData.basicInfo.phone || ''} 
                          onChange={handleBasicInfoChange} 
                          placeholder="+1 (555) 123-4567"
                          className="border-gray-300 dark:border-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location" className="text-gray-700 dark:text-gray-300">Location</Label>
                        <Input 
                          id="location" 
                          name="location" 
                          value={resumeData.basicInfo.location || ''} 
                          onChange={handleBasicInfoChange} 
                          placeholder="New York, NY"
                          className="border-gray-300 dark:border-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="linkedin" className="text-gray-700 dark:text-gray-300">LinkedIn</Label>
                        <Input 
                          id="linkedin" 
                          name="linkedin" 
                          value={resumeData.basicInfo.linkedin || ''} 
                          onChange={handleBasicInfoChange} 
                          placeholder="linkedin.com/in/johndoe"
                          className="border-gray-300 dark:border-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="github" className="text-gray-700 dark:text-gray-300">GitHub</Label>
                        <Input 
                          id="github" 
                          name="github" 
                          value={resumeData.basicInfo.github || ''} 
                          onChange={handleBasicInfoChange} 
                          placeholder="github.com/johndoe"
                          className="border-gray-300 dark:border-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="summary" className="text-gray-700 dark:text-gray-300">Professional Summary</Label>
                      <Textarea 
                        id="summary" 
                        name="summary" 
                        value={resumeData.summary || ''} 
                        onChange={(e) => updateResumeData({ summary: e.target.value })} 
                        placeholder="Experienced software engineer with expertise in..."
                        className="min-h-[120px] border-gray-300 dark:border-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </TabsContent>

                  {/* Experience Tab */}
                  <TabsContent value="experience" className="p-6 space-y-6 bg-white dark:bg-gray-900 rounded-b-lg">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                        Work Experience
                      </h2>
                      <Button onClick={addExperience} variant="outline" size="sm" className="border-indigo-300 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-950">
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
                        <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                          <FileText className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" />
                          <h3 className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-300">No experience added</h3>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by adding your work experience.</p>
                          <div className="mt-6">
                            <Button onClick={addExperience} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                              <PlusCircle className="mr-2 h-4 w-4" />
                              Add Experience
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  {/* Education Tab */}
                  <TabsContent value="education" className="p-6 space-y-6 bg-white dark:bg-gray-900 rounded-b-lg">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                        Education
                      </h2>
                      <Button onClick={addEducation} variant="outline" size="sm" className="border-indigo-300 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-950">
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
                        <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                          <GraduationCap className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" />
                          <h3 className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-300">No education added</h3>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by adding your education history.</p>
                          <div className="mt-6">
                            <Button onClick={addEducation} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                              <PlusCircle className="mr-2 h-4 w-4" />
                              Add Education
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  {/* Projects Tab */}
                  <TabsContent value="projects" className="p-6 bg-white dark:bg-gray-900 rounded-b-lg">
                    <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                      <Code className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      Projects
                    </h2>
                    <ProjectsForm formId="projects" />
                  </TabsContent>

                  {/* Skills Tab */}
                  <TabsContent value="skills" className="p-6 bg-white dark:bg-gray-900 rounded-b-lg">
                    <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                      <Laptop className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      Skills
                    </h2>
                    <SkillsForm />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - Preview */}
          <div className="hidden lg:block">
            <div className="sticky top-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Eye className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                Resume Preview
              </h2>
              <Card className="overflow-hidden shadow-lg border-gray-200 dark:border-gray-800">
                <ResumePreview />
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
