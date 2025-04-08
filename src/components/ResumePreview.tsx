import React, { useRef } from 'react';
import { useResumeContext } from '@/context/ResumeContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Printer } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import { useToast } from "@/hooks/use-toast";

const ResumePreview: React.FC = () => {
    const { resumeData } = useResumeContext();
    const resumeRef = useRef<HTMLDivElement>(null);
    const { toast } = useToast();

    const handleDownload = async () => {
        if (resumeRef.current) {
            const element = resumeRef.current;
            const opt = {
                margin: 10,
                filename: 'resume.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            try {
                await html2pdf().from(element).set(opt).save();
                toast({
                    title: "Download successful!",
                    description: "Your resume has been downloaded.",
                })
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Download failed!",
                    description: "There was an error downloading your resume.",
                })
            }
        }
    };

    const handlePrint = () => {
        if (resumeRef.current) {
            const element = resumeRef.current;
            const printWindow = window.open('', '_blank');
            printWindow?.document.write(`
                <html>
                    <head>
                        <title>Print</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                margin: 0;
                                padding: 0;
                            }
                            .resume-container {
                                width: 100%;
                                padding: 20px;
                                box-sizing: border-box;
                            }
                            /* Add more styles as needed */
                        </style>
                    </head>
                    <body>
                        <div class="resume-container">${element.innerHTML}</div>
                    </body>
                </html>
            `);
            printWindow?.document.close();
            printWindow?.focus();
            printWindow?.print();
            printWindow?.close();
        }
    };

    return (
        <Card className="w-full h-full">
            <CardContent className="relative h-full">
                <div className="flex justify-end space-x-2 absolute top-2 right-2 z-10">
                    <Button variant="outline" size="sm" onClick={handlePrint}>
                        <Printer className="mr-2 h-4 w-4" />
                        Print
                    </Button>
                    <Button size="sm" onClick={handleDownload}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                    </Button>
                </div>
                <div ref={resumeRef} className="p-4">
                    {/* Basic Information */}
                    <div className="text-center">
                        <h1 className="text-2xl font-bold">{resumeData.basicInfo?.name || 'Your Name'}</h1>
                        <p className="text-gray-600">{resumeData.basicInfo?.email || 'Your Email'}</p>
                        <p className="text-gray-600">{resumeData.basicInfo?.phone || 'Your Phone'}</p>
                        <p className="text-gray-600">{resumeData.basicInfo?.linkedin || 'Your LinkedIn'}</p>
                        <p className="text-gray-600">{resumeData.basicInfo?.github || 'Your GitHub'}</p>
                    </div>

                    {/* Summary */}
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold">Summary</h2>
                        <p>{resumeData.summary || 'Add a brief summary about yourself.'}</p>
                    </div>

                    {/* Experience */}
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold">Experience</h2>
                        {resumeData.experience && resumeData.experience.length > 0 ? (
                            resumeData.experience.map((exp, index) => (
                                <div key={index} className="mb-2">
                                    <h3 className="font-semibold">{exp.title} at {exp.company}</h3>
                                    <p className="text-gray-600">{exp.startDate} - {exp.endDate || 'Present'}</p>
                                    <p>{exp.description}</p>
                                </div>
                            ))
                        ) : (
                            <p>No experience added.</p>
                        )}
                    </div>

                    {/* Education */}
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold">Education</h2>
                        {resumeData.education && resumeData.education.length > 0 ? (
                            resumeData.education.map((edu, index) => (
                                <div key={index} className="mb-2">
                                    <h3 className="font-semibold">{edu.degree} in {edu.major}</h3>
                                    <p className="text-gray-600">{edu.university}</p>
                                    <p className="text-gray-600">{edu.graduationDate}</p>
                                    <p>{edu.description}</p>
                                </div>
                            ))
                        ) : (
                            <p>No education added.</p>
                        )}
                    </div>

                    {/* Projects */}
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold">Projects</h2>
                        {resumeData.projects && resumeData.projects.length > 0 ? (
                            resumeData.projects.map((project, index) => (
                                <div key={index} className="mb-2">
                                    <h3 className="font-semibold">{project.name}</h3>
                                    <p className="text-gray-600">{project.link}</p>
                                    <p>{project.description}</p>
                                </div>
                            ))
                        ) : (
                            <p>No projects added.</p>
                        )}
                    </div>

                    {/* Skills */}
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold">Skills</h2>
                        {resumeData.skills && resumeData.skills.length > 0 ? (
                            <div className="flex flex-wrap">
                                {resumeData.skills.map((skill, index) => (
                                    <span key={index} className="bg-gray-200 rounded-full px-3 py-1 m-1">{skill}</span>
                                ))}
                            </div>
                        ) : (
                            <p>No skills added.</p>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ResumePreview;
