
import React, { useRef } from 'react';
import { useResumeContext } from '@/context/ResumeContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Printer, ExternalLink } from 'lucide-react';
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
                filename: `${resumeData.basicInfo?.name || 'resume'}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            try {
                await html2pdf().from(element).set(opt).save();
                toast({
                    title: "Download successful!",
                    description: "Your resume has been downloaded.",
                    variant: "default",
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
                        <title>Print Resume - ${resumeData.basicInfo?.name || 'Resume'}</title>
                        <style>
                            body {
                                font-family: 'Arial', sans-serif;
                                margin: 0;
                                padding: 20px;
                                color: #333;
                            }
                            .resume-container {
                                max-width: 800px;
                                margin: 0 auto;
                                padding: 20px;
                                box-sizing: border-box;
                            }
                            h1 {
                                color: #2d3748;
                                margin-bottom: 4px;
                            }
                            h2 {
                                color: #4a5568;
                                border-bottom: 1px solid #e2e8f0;
                                padding-bottom: 8px;
                                margin-top: 20px;
                            }
                            .contact-info {
                                color: #718096;
                                margin-bottom: 16px;
                            }
                            .section {
                                margin-bottom: 24px;
                            }
                            .item {
                                margin-bottom: 16px;
                            }
                            .item-title {
                                font-weight: bold;
                                margin-bottom: 4px;
                            }
                            .item-subtitle {
                                color: #718096;
                                margin-bottom: 4px;
                                font-style: italic;
                            }
                            .skills-container {
                                display: flex;
                                flex-wrap: wrap;
                                gap: 8px;
                            }
                            .skill-tag {
                                background-color: #f7fafc;
                                border: 1px solid #e2e8f0;
                                border-radius: 12px;
                                padding: 4px 10px;
                                font-size: 14px;
                            }
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
        <Card className="w-full h-full border border-gray-200 dark:border-gray-800 overflow-hidden">
            <CardContent className="relative h-full p-0">
                <div className="flex justify-end space-x-2 absolute top-3 right-3 z-10">
                    <Button variant="outline" size="sm" className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={handlePrint}>
                        <Printer className="mr-2 h-4 w-4 text-gray-600 dark:text-gray-400" />
                        Print
                    </Button>
                    <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700" onClick={handleDownload}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                    </Button>
                </div>
                <div ref={resumeRef} className="p-8 pt-14 bg-white dark:bg-gray-900 shadow-sm rounded-sm">
                    {/* Basic Information */}
                    <div className="text-center border-b border-gray-200 dark:border-gray-800 pb-4">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{resumeData.basicInfo?.name || 'Your Name'}</h1>
                        <div className="mt-2 flex flex-wrap justify-center gap-3 text-gray-600 dark:text-gray-400 text-sm">
                            {resumeData.basicInfo?.email && (
                                <div className="flex items-center">
                                    <span>{resumeData.basicInfo.email}</span>
                                </div>
                            )}
                            {resumeData.basicInfo?.phone && (
                                <div className="flex items-center">
                                    <span>•</span>
                                    <span className="ml-2">{resumeData.basicInfo.phone}</span>
                                </div>
                            )}
                            {resumeData.basicInfo?.location && (
                                <div className="flex items-center">
                                    <span>•</span>
                                    <span className="ml-2">{resumeData.basicInfo.location}</span>
                                </div>
                            )}
                        </div>
                        <div className="mt-2 flex flex-wrap justify-center gap-4 text-indigo-600 dark:text-indigo-400 text-sm">
                            {resumeData.basicInfo?.linkedin && (
                                <a href={`https://${resumeData.basicInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center hover:underline">
                                    <span>LinkedIn</span>
                                    <ExternalLink className="ml-1 h-3 w-3" />
                                </a>
                            )}
                            {resumeData.basicInfo?.github && (
                                <a href={`https://${resumeData.basicInfo.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center hover:underline">
                                    <span>GitHub</span>
                                    <ExternalLink className="ml-1 h-3 w-3" />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Summary */}
                    {resumeData.summary && (
                        <div className="mt-6">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-800 pb-2 mb-3">Summary</h2>
                            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{resumeData.summary}</p>
                        </div>
                    )}

                    {/* Experience */}
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-800 pb-2 mb-3">Experience</h2>
                        {resumeData.experience && resumeData.experience.length > 0 ? (
                            <div className="space-y-4">
                                {resumeData.experience.map((exp, index) => (
                                    <div key={index} className="mb-3">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-semibold text-gray-800 dark:text-gray-200">{exp.title || 'Position'} {exp.company && `at ${exp.company}`}</h3>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">{exp.startDate} {exp.endDate ? `- ${exp.endDate}` : '- Present'}</span>
                                        </div>
                                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 whitespace-pre-line">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400 text-sm italic">No experience added.</p>
                        )}
                    </div>

                    {/* Education */}
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-800 pb-2 mb-3">Education</h2>
                        {resumeData.education && resumeData.education.length > 0 ? (
                            <div className="space-y-4">
                                {resumeData.education.map((edu, index) => (
                                    <div key={index} className="mb-3">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                                                {edu.degree} {edu.major && `in ${edu.major}`}
                                            </h3>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">{edu.graduationDate}</span>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">{edu.university}</p>
                                        {edu.description && (
                                            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 whitespace-pre-line">{edu.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400 text-sm italic">No education added.</p>
                        )}
                    </div>

                    {/* Projects */}
                    {resumeData.projects && resumeData.projects.length > 0 && (
                        <div className="mt-6">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-800 pb-2 mb-3">Projects</h2>
                            <div className="space-y-4">
                                {resumeData.projects.map((project, index) => (
                                    <div key={index} className="mb-3">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-semibold text-gray-800 dark:text-gray-200">{project.name}</h3>
                                        </div>
                                        {project.link && (
                                            <a 
                                                href={project.link.startsWith('http') ? project.link : `https://${project.link}`} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-indigo-600 dark:text-indigo-400 text-sm hover:underline flex items-center"
                                            >
                                                {project.link}
                                                <ExternalLink className="ml-1 h-3 w-3" />
                                            </a>
                                        )}
                                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 whitespace-pre-line">{project.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Skills */}
                    {resumeData.skills && resumeData.skills.length > 0 && (
                        <div className="mt-6">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-800 pb-2 mb-3">Skills</h2>
                            <div className="flex flex-wrap gap-2 mt-3">
                                {resumeData.skills.map((skill, index) => (
                                    <span 
                                        key={index} 
                                        className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full px-3 py-1 text-sm"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default ResumePreview;
