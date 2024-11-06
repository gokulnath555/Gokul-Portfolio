import React, { useState, useEffect } from 'react';
import { 
  Code, 
  User,
  Briefcase,
  GraduationCap,
  Award,
  Laptop,
  FileCode,
  Terminal,
  Globe,
  Settings,
  UserCircle
} from 'lucide-react';

const Header = ({ toggleDrawer }) => (
  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg sticky top-0 z-50">
    <div className="flex justify-between items-center p-4">
      <button 
        onClick={toggleDrawer}
        className="text-white hover:bg-indigo-700 p-2 rounded-full transition-colors duration-300"
      >
        <Code className="w-6 h-6" />
      </button>
      <h1 className="text-2xl font-bold text-white">GokulNath  Portfolio</h1>
      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
        <UserCircle className="w-6 h-6 text-indigo-600" />
      </div>
    </div>
  </div>
);

const Sidebar = ({ open, toggleDrawer, activeSection, onSectionClick }) => {
  const sections = [
    { name: 'Professional Summary', icon: <User className="w-5 h-5" /> },
    { name: 'Skills', icon: <Laptop className="w-5 h-5" /> },
    { name: 'Experience', icon: <Briefcase className="w-5 h-5" /> },
    { name: 'Education', icon: <GraduationCap className="w-5 h-5" /> },
    { name: 'Projects', icon: <FileCode className="w-5 h-5" /> },
    { name: 'Certifications', icon: <Award className="w-5 h-5" /> },
  ];

  return (
    <div 
      className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 transform ${
        open ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="p-6">
        <h2 className="text-xl font-bold text-indigo-600 mb-6 flex items-center">
          <Code className="mr-2" /> GokulNath
        </h2>
        <nav>
          {sections.map((section) => (
            <button
              key={section.name}
              onClick={() => onSectionClick(section.name.toLowerCase().replace(' ', '-'))}
              className={`flex items-center w-full text-left p-3 mb-2 rounded-lg transition-all duration-300 ${
                activeSection === section.name.toLowerCase().replace(' ', '-')
                  ? 'bg-indigo-50 text-indigo-600 shadow-md'
                  : 'hover:bg-gray-50 hover:text-indigo-600'
              }`}
            >
              <span className="mr-3">{section.icon}</span>
              {section.name}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

const SectionCard = ({ title, icon, children, id }) => (
  <div
    id={id}
    className="bg-white rounded-xl shadow-lg p-6 mb-6 hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
  >
    <h2 className="text-xl font-bold text-indigo-600 mb-4 flex items-center">
      {icon}
      <span className="ml-2">{title}</span>
    </h2>
    {children}
  </div>
);

const SkillBar = ({ skill, level, icon }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium text-gray-700 flex items-center">
        {icon}
        <span className="ml-2">{skill}</span>
      </span>
      <span className="text-sm text-gray-500">{level}%</span>
    </div>
    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000 ease-out transform hover:scale-x-105"
        style={{ width: `${level}%` }}
      />
    </div>
  </div>
);

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('professional-summary');

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'professional-summary',
        'skills',
        'experience',
        'education',
        'projects',
        'certifications'
      ];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSectionClick = (section) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(section);
      setDrawerOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      <Header toggleDrawer={toggleDrawer} />
      <Sidebar
        open={drawerOpen}
        toggleDrawer={toggleDrawer}
        activeSection={activeSection}
        onSectionClick={handleSectionClick}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <SectionCard 
              title="Professional Summary" 
              id="professional-summary"
              icon={<User className="w-6 h-6" />}
            >
              <p className="text-gray-600 leading-relaxed">
              Versatile Web Developer and Proprietor with over six years of experience in web development, 
design, and real estate image editing. Proficient in HTML5, JavaScript, CSS, and React.js, with 
a strong foundation in creating responsive, user-friendly websites. Known for managing 
end-to-end client projects and delivering high-quality visual content for real estate clients. 
Currently seeking to leverage technical expertise and client management experience in a Web 
Developer role.
              </p>
            </SectionCard>

            <SectionCard 
              title="Technical Skills" 
              id="skills"
              icon={<Settings className="w-6 h-6" />}
            >
              <SkillBar skill="React.js" level={90} icon={<Code className="w-4 h-4 text-blue-500" />} />
              <SkillBar skill="JavaScript" level={85} icon={<Terminal className="w-4 h-4 text-yellow-500" />} />
              <SkillBar skill="HTML/CSS" level={95} icon={<Globe className="w-4 h-4 text-red-500" />} />
              <SkillBar skill="Photoshop/LightRoom " level={80} icon={<Settings className="w-4 h-4 text-blue-500" />} />
            </SectionCard>

            <SectionCard 
              title="Experience" 
              id="experience"
              icon={<Briefcase className="w-6 h-6" />}
            >
              {[
                {
                  role: "Web Developer",
                  company: "Grow Technologies",
                  period: "2018 - 2021",
                  description: " Designed and developed responsive, visually engaging websites that aligned with client enhanced user experiance "
                },
                {
                  role: "Proprietor",
                  company: "JP Outsource Infotech",
                  period: "2021 - Present",
                  description: "Managing Real Estate Image Editing projects and client relationships."
                }
              ].map((exp, index) => (
                <div key={index} className="mb-4 last:mb-0 p-4 rounded-lg hover:bg-indigo-50 transition-colors">
                  <h3 className="font-semibold text-gray-800">{exp.role}</h3>
                  <p className="text-indigo-600">{exp.company}</p>
                  <p className="text-sm text-gray-500">{exp.period}</p>
                  <p className="mt-2 text-gray-600">{exp.description}</p>
                </div>
              ))}
            </SectionCard>
          </div>

          <div>
            <SectionCard 
              title="Education" 
              id="education"
              icon={<GraduationCap className="w-6 h-6" />}
            >
              <div className="space-y-4">
                {[
                  {
                    degree: "Bachelor's in Information Technology",
                    school: "Sona College Of Technology",
                    year: "2017"
                  },
                  {
                    degree: "Diploma in Computer Science",
                    school: "Thiagarajar Polytechnic College",
                    year: "2014"
                  }
                ].map((edu, index) => (
                  <div key={index} className="p-4 rounded-lg hover:bg-indigo-50 transition-colors">
                    <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                    <p className="text-indigo-600">{edu.school}</p>
                    <p className="text-sm text-gray-500">{edu.year}</p>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard 
              title="Projects" 
              id="projects"
              icon={<FileCode className="w-6 h-6" />}
            >
              <div className="space-y-4">
                {[
                  {
                    name: "Portfolio Website",
                    description: "Personal portfolio built with React and Tailwind CSS"
                  },
                  // {
                  //   name: "E-commerce Platform",
                  //   description: "Full-stack e-commerce solution with React and Node.js"
                  // }
                ].map((project, index) => (
                  <div key={index} className="p-4 rounded-lg hover:bg-indigo-50 transition-colors">
                    <h3 className="font-semibold text-gray-800">{project.name}</h3>
                    <p className="text-gray-600">{project.description}</p>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard 
              title="Certifications" 
              id="certifications"
              icon={<Award className="w-6 h-6" />}
            >
              <div className="space-y-4">
                {[
                  {
                    name: "React Developer Certification",
                    year: "2024"
                  },
                  {
                    name: "Digital Marketing Certification",
                    year: "2024"
                  },

                  {
                    name: "Java Developer Certification",
                    year: "2017"
                  }
                ].map((cert, index) => (
                  <div key={index} className="p-4 rounded-lg hover:bg-indigo-50 transition-colors">
                    <h3 className="font-semibold text-gray-800">{cert.name}</h3>
                    <p className="text-sm text-gray-500">{cert.year}</p>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;