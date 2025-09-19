import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Slider } from '../ui/slider';
import { ArrowLeft, ArrowRight, Upload, MapPin, FileText, AlertTriangle, Eye, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from '../imagefallback/ImageWithFallback';

interface ReportIssueProps {
  onBack: () => void;
}

interface IssueData {
  area: string;
  image?: File;
  description: string;
  severity: number;
}

const SEVERITY_LABELS = ['Low', 'Medium', 'High', 'Urgent', 'Critical'];
const SEVERITY_COLORS = ['#10B981', '#F59E0B', '#EF4444', '#DC2626', '#991B1B'];

export function ReportIssue({ onBack }: ReportIssueProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [issueData, setIssueData] = useState<IssueData>({
    area: '',
    description: '',
    severity: 1
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 6;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIssueData({ ...issueData, image: file });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentStep(6);
    }, 2000);
  };

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1: return <MapPin className="h-5 w-5" />;
      case 2: return <Upload className="h-5 w-5" />;
      case 3: return <FileText className="h-5 w-5" />;
      case 4: return <AlertTriangle className="h-5 w-5" />;
      case 5: return <Eye className="h-5 w-5" />;
      case 6: return <CheckCircle className="h-5 w-5" />;
      default: return null;
    }
  };

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1: return 'Select Area';
      case 2: return 'Upload Image';
      case 3: return 'Describe Problem';
      case 4: return 'Rate Severity';
      case 5: return 'Review & Submit';
      case 6: return 'Confirmation';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-white hover:bg-[#1E293B]"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-xl font-semibold">Report Issue</h1>
          <div className="w-20"></div>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div key={i} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  i + 1 === currentStep ? 'bg-blue-500 text-white' :
                  i + 1 < currentStep ? 'bg-green-500 text-white' :
                  'bg-[#334155] text-gray-400'
                }`}>
                  {i + 1 < currentStep ? <CheckCircle className="h-5 w-5" /> : getStepIcon(i + 1)}
                </div>
                {i < totalSteps - 1 && (
                  <div className={`h-1 w-8 mx-2 ${
                    i + 1 < currentStep ? 'bg-green-500' : 'bg-[#334155]'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="max-w-2xl mx-auto bg-[#1E293B] border-[#475569]">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              {getStepIcon(currentStep)}
              <span>{getStepTitle(currentStep)}</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: Select Area */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="text-white mb-2 block">Choose your area/ward</label>
                  <Select value={issueData.area} onValueChange={(value) => setIssueData({ ...issueData, area: value })}>
                    <SelectTrigger className="bg-[#334155] border-[#475569] text-white">
                      <SelectValue placeholder="Select your area" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#334155] border-[#475569]">
                      <SelectItem value="ward-1">Ward 1 - Central District</SelectItem>
                      <SelectItem value="ward-2">Ward 2 - North Zone</SelectItem>
                      <SelectItem value="ward-3">Ward 3 - South Zone</SelectItem>
                      <SelectItem value="ward-4">Ward 4 - East Zone</SelectItem>
                      <SelectItem value="ward-5">Ward 5 - West Zone</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 2: Upload Image */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="text-white mb-2 block">Upload an image of the issue</label>
                  <div className="border-2 border-dashed border-[#475569] rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-white mb-2">Click to upload or drag and drop</p>
                      <p className="text-gray-400 text-sm">Maximum file size: 5MB</p>
                    </label>
                    {issueData.image && (
                      <div className="mt-4">
                        <p className="text-green-400">File uploaded: {issueData.image.name}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Describe Problem */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="text-white mb-2 block">Describe the issue in detail</label>
                  <Textarea
                    placeholder="Please provide a detailed description of the issue..."
                    value={issueData.description}
                    onChange={(e) => setIssueData({ ...issueData, description: e.target.value })}
                    className="bg-[#334155] border-[#475569] text-white placeholder:text-gray-400 min-h-[120px]"
                  />
                </div>
              </div>
            )}

            {/* Step 4: Rate Severity */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <label className="text-white mb-4 block">Rate the severity of this issue</label>
                  <div className="space-y-4">
                    <div className="px-4">
                      <Slider
                        value={[issueData.severity]}
                        onValueChange={(value) => setIssueData({ ...issueData, severity: value[0] })}
                        max={5}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                    </div>
                    <div className="flex justify-between text-sm">
                      {SEVERITY_LABELS.map((label, index) => (
                        <span key={label} className={`${
                          issueData.severity === index + 1 ? 'text-white font-semibold' : 'text-gray-400'
                        }`}>
                          {label}
                        </span>
                      ))}
                    </div>
                    <div className="text-center">
                      <div 
                        className="inline-block px-4 py-2 rounded-full text-white font-semibold"
                        style={{ backgroundColor: SEVERITY_COLORS[issueData.severity - 1] }}
                      >
                        {SEVERITY_LABELS[issueData.severity - 1]}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Review & Submit */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="bg-[#334155] rounded-lg p-4 space-y-4">
                  <h3 className="font-semibold text-white">Review Your Submission</h3>
                  
                  <div>
                    <label className="text-gray-300 text-sm">Area:</label>
                    <p className="text-white">{issueData.area}</p>
                  </div>

                  {issueData.image && (
                    <div>
                      <label className="text-gray-300 text-sm">Image:</label>
                      <p className="text-white">{issueData.image.name}</p>
                    </div>
                  )}

                  <div>
                    <label className="text-gray-300 text-sm">Description:</label>
                    <p className="text-white">{issueData.description}</p>
                  </div>

                  <div>
                    <label className="text-gray-300 text-sm">Severity:</label>
                    <div 
                      className="inline-block px-3 py-1 rounded-full text-white text-sm font-semibold"
                      style={{ backgroundColor: SEVERITY_COLORS[issueData.severity - 1] }}
                    >
                      {SEVERITY_LABELS[issueData.severity - 1]}
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
                </Button>
              </div>
            )}

            {/* Step 6: Confirmation */}
            {currentStep === 6 && (
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Issue Reported Successfully!</h3>
                  <p className="text-gray-300 mb-4">
                    Your complaint has been submitted and assigned ID: <span className="font-semibold text-blue-400">#CIV-2024-001</span>
                  </p>
                  <p className="text-gray-300">
                    You will receive SMS updates on your registered mobile number.
                  </p>
                </div>
                <Button 
                  onClick={onBack}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Back to Home
                </Button>
              </div>
            )}

            {/* Navigation Buttons */}
            {currentStep < 5 && (
              <div className="flex justify-between pt-6">
                <Button 
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="border-[#475569] text-white hover:bg-[#334155]"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <Button 
                  onClick={handleNext}
                  disabled={
                    (currentStep === 1 && !issueData.area) ||
                    (currentStep === 3 && !issueData.description)
                  }
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}