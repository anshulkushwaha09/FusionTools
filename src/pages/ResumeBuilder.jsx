import { useState } from 'react';
import { FileText, Download, User, Briefcase, GraduationCap, LayoutList } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import ReactMarkdown from 'react-markdown';
import { generateResume } from '../services/groq';
import LeadCapture from '../components/LeadCapture';

const ResumeBuilder = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    address: '',
    skills: '',
    experience: '',
    education: '',
    summary: ''
  });
  const [resume, setResume] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await generateResume(formData);
      setResume(result);
    } catch (err) {
      setError("Failed to generate resume. Please check your API key.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById('resume-preview');
    const opt = {
      margin: 1,
      filename: `${formData.name || 'Resume'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="container mx-auto max-w-6xl space-y-8 fade-in">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00f3ff] to-[#bc13fe]">
          AI Resume Builder
        </h1>
        <p className="text-gray-400">Transform your details into a professional resume.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="space-y-6">
          <Card title="Personal Details" icon={<User size={20} />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" />
              <Input label="Email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" />
              <Input label="Phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 234 567 890" />
              <Input label="Location" name="address" value={formData.address} onChange={handleChange} placeholder="New York, USA" />
              <div className="md:col-span-2">
                <Input label="LinkedIn / Portfolio" name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="linkedin.com/in/johndoe" />
              </div>
            </div>
          </Card>

          <Card title="Experience & Skills" icon={<Briefcase size={20} />}>
            <div className="space-y-4">
              <Input label="Skills (comma separated)" name="skills" value={formData.skills} onChange={handleChange} placeholder="React, Node.js, Design..." textarea rows={2} />
              <Input label="Work Experience (Include Company Name, Role, Date, & Details)" name="experience" value={formData.experience} onChange={handleChange} placeholder="2020-Present: Senior Dev at Tech Co. - Led team of 5..." textarea rows={6} />
            </div>
          </Card>

          <Card title="Education & Summary" icon={<GraduationCap size={20} />}>
            <div className="space-y-4">
              <Input label="Education" name="education" value={formData.education} onChange={handleChange} placeholder="University details..." textarea rows={2} />
              <Input label="Professional Summary" name="summary" value={formData.summary} onChange={handleChange} placeholder="Brief bio..." textarea rows={3} />
            </div>
          </Card>
          
          {error && <p className="text-red-400 text-sm">{error}</p>}

          <Button onClick={handleGenerate} isLoading={loading} className="w-full" icon={<LayoutList size={20} />}>
            Generate Resume
          </Button>
        </div>



        {/* Preview */}
        <div className="lg:sticky lg:top-24 h-fit space-y-6">
          <Card title="Resume Preview" className="min-h-[600px] flex flex-col relative text-white">
            {resume && (
              <div className="absolute top-4 right-4 z-10">
                <Button variant="secondary" onClick={handleDownloadPDF} className="bg-gray-800 text-white hover:bg-gray-700" icon={<Download size={18} />}>
                  PDF
                </Button>
              </div>
            )}
            <div id="resume-preview" className="prose max-w-none p-8 flex-grow">
              {resume ? (
                <ReactMarkdown>{resume}</ReactMarkdown>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <p>Fill form and click generate...</p>
                </div>
              )}
            </div>
          </Card>
          
          {resume && <LeadCapture variant="tool-output" />}
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
