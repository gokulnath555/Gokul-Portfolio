import React, { useState, useEffect } from 'react';

// Simple icon component
const IconComponent = ({ children, className }) => (
  <span className={`inline-flex items-center justify-center ${className}`}>
    {children}
  </span>
);

// Define background colors for each section
const sectionStyles = {
  'professional-summary': 'bg-blue-50',
  'skills': 'bg-green-50',
  'experience': 'bg-yellow-50',
  'education': 'bg-purple-50',
  'projects': 'bg-pink-50',
  'certifications': 'bg-indigo-50',
};

const Header = ({ toggleDrawer }) => (
  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg sticky top-0 z-50">
    <div className="flex justify-between items-center p-4">
      <button 
        onClick={toggleDrawer}
        className="text-white hover:bg-indigo-700 p-2 rounded-full transition-colors duration-300"
      >
        <IconComponent className="w-6 h-6">⌨️</IconComponent>
      </button>
      <h1 className="text-2xl font-bold text-white">GokulNath Portfolio</h1>
      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
        <IconComponent className="w-6 h-6 text-indigo-600">👤</IconComponent>
      </div>
    </div>
  </div>
);

const Sidebar = ({ open, toggleDrawer, activeSection, onSectionClick }) => {
  const sections = [
    { name: 'Professional Summary', icon: <IconComponent className="w-5 h-5">👤</IconComponent> },
    { name: 'Skills', icon: <IconComponent className="w-5 h-5">💻</IconComponent> },
    { name: 'Experience', icon: <IconComponent className="w-5 h-5">💼</IconComponent> },
    { name: 'Education', icon: <IconComponent className="w-5 h-5">🎓</IconComponent> },
    { name: 'Projects', icon: <IconComponent className="w-5 h-5">📁</IconComponent> },
    { name: 'Certifications', icon: <IconComponent className="w-5 h-5">🏆</IconComponent> },
  ];

  return (
    <div 
      className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-white via-indigo-50 to-purple-50 shadow-lg z-50 transform ${
        open ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="h-full p-6 bg-white bg-opacity-90">
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg">
            <IconComponent className="w-6 h-6 text-white">⌨️</IconComponent>
          </div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            GokulNath
          </h2>
        </div>
        
        <nav className="space-y-2">
          {sections.map((section) => (
            <button
              key={section.name}
              onClick={() => onSectionClick(section.name.toLowerCase().replace(' ', '-'))}
              className={`flex items-center w-full text-left p-3 rounded-lg transition-all duration-300 group ${
                activeSection === section.name.toLowerCase().replace(' ', '-')
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                  : 'hover:bg-indigo-50 text-gray-700 hover:text-indigo-600'
              }`}
            >
              <span className={`mr-3 transition-transform duration-300 group-hover:scale-110 ${
                activeSection === section.name.toLowerCase().replace(' ', '-')
                  ? 'text-white'
                  : 'text-indigo-600'
              }`}>
                {section.icon}
              </span>
              <span className="font-medium">{section.name}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

const SectionCard = ({ title, icon, children, id }) => {
  const sectionClass = sectionStyles[id];

  return (
    <div
      id={id}
      className={`${sectionClass} rounded-xl shadow-lg p-6 mb-6 hover:shadow-xl transition-all duration-500 hover:-translate-y-1`}
    >
      <h2 className="text-xl font-bold text-indigo-600 mb-4 flex items-center">
        {icon}
        <span className="ml-2">{title}</span>
      </h2>
      {children}
    </div>
  );
};

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
              icon={<IconComponent className="w-6 h-6">👤</IconComponent>}
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
              icon={<IconComponent className="w-6 h-6">💻</IconComponent>}
            >
              <SkillBar skill="React.js" level={90} icon={<IconComponent className="w-4 h-4">⚛️</IconComponent>} />
              <SkillBar skill="JavaScript" level={85} icon={<IconComponent className="w-4 h-4">📜</IconComponent>} />
              <SkillBar skill="HTML/CSS" level={95} icon={<IconComponent className="w-4 h-4">🌐</IconComponent>} />
              <SkillBar skill="Photoshop/LightRoom" level={80} icon={<IconComponent className="w-4 h-4">🎨</IconComponent>} />
            </SectionCard>

            <SectionCard 
              title="Experience" 
              id="experience"
              icon={<IconComponent className="w-6 h-6">💼</IconComponent>}
            >
              {[
                {
                  role: "Web Developer",
                  company: "Grow Technologies",
                  period: "2018 - 2021",
                  description: "Designed and developed responsive, visually engaging websites that enhanced user experience."
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
              icon={<IconComponent className="w-6 h-6">🎓</IconComponent>}
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
              icon={<IconComponent className="w-6 h-6">📁</IconComponent>}
            >
              <div className="space-y-4">
                {[
                  {
                    name: "Portfolio Website",
                    description: "Personal portfolio built with React and Tailwind CSS"
                  },
                  {
                    name: "E-commerce Platform",
                    description: "Full-stack e-commerce solution with React and Node.js"
                  }
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
              icon={<IconComponent className="w-6 h-6">🏆</IconComponent>}
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
                  // {
                  //   name: "Java Developer Certification",
                  //   year: "2017"
                  // }
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