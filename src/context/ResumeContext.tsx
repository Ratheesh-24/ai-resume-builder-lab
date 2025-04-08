
import React, { createContext, useContext, useState } from 'react';
import { ResumeData } from '@/types/resume';

interface ResumeContextType {
  resumeData: ResumeData;
  updateResumeData: (data: Partial<ResumeData>) => void;
}

const defaultResumeData: ResumeData = {
  basicInfo: {
    name: '',
    email: '',
    phone: '',
  },
  summary: '',
  experience: [],
  education: [],
  projects: [],
  skills: [],
};

const ResumeContext = createContext<ResumeContextType>({
  resumeData: defaultResumeData,
  updateResumeData: () => {},
});

export const useResumeContext = () => useContext(ResumeContext);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);

  const updateResumeData = (data: Partial<ResumeData>) => {
    setResumeData((prevData) => ({ ...prevData, ...data }));
  };

  return (
    <ResumeContext.Provider value={{ resumeData, updateResumeData }}>
      {children}
    </ResumeContext.Provider>
  );
};
