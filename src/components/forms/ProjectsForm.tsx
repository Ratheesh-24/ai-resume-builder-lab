import React from 'react';
import { useResumeContext } from '@/context/ResumeContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Trash2 } from 'lucide-react';
import { Project } from '@/types/resume';
import { useToast } from "@/hooks/use-toast";

interface Props {
    formId: string;
}

const ProjectsForm = ({ formId }: Props) => {
    const { resumeData, updateResumeData } = useResumeContext();
    const { toast } = useToast();

    const projects = resumeData?.projects || [];

    const addProject = () => {
        updateResumeData({
            ...resumeData,
            projects: [...projects, { id: crypto.randomUUID(), name: '', description: '' }],
        });
    };

    const updateProject = (id: string, field: string, value: string) => {
        const updatedProjects = projects.map((project) =>
            project.id === id ? { ...project, [field]: value } : project
        );
        updateResumeData({ ...resumeData, projects: updatedProjects });
    };

    const deleteProject = (id: string) => {
        updateResumeData({
            ...resumeData,
            projects: projects.filter((project) => project.id !== id),
        });

        toast({
            title: "Project Deleted",
            description: "Your project has been deleted successfully.",
        })
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Projects</CardTitle>
            </CardHeader>
            <CardContent className="relative space-y-4">
                {projects.map((project) => (
                    <div key={project.id} className="grid gap-4">
                        <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                            <Label htmlFor="name">Project Name</Label>
                            <Input
                                id="name"
                                value={project.name}
                                onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-[100px_1fr] items-start gap-4">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={project.description}
                                onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                            />
                        </div>
                        <Button type="button" variant="destructive" size="sm"
                            onClick={() => deleteProject(project.id)} className="absolute top-2 right-2">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                        </Button>
                    </div>
                ))}
                <Button type="button" onClick={addProject}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Project
                </Button>
            </CardContent>
        </Card>
    );
};

export default ProjectsForm;
