import React, { useState } from 'react';
import styled from 'styled-components';

const SectionTitle = styled.h1`
  text-align: center;
  margin-bottom: 10px;
`;

const SectionSubtitle = styled.p`
  text-align: center;
  opacity: 0.6;
  font-size: 0.95em;
  margin-bottom: 30px;
`;

const VolunteerProjectsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 0 20px 50px;
  background-color: transparent;
`;

const VolunteerProjectCard = styled.div`
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px ${(props) => props.theme.boxShadowColor};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 10px ${(props) => props.theme.boxShadowColor};
  }
`;

const VolunteerProjectTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 4px;
`;

const RoleBadge = styled.span`
  display: inline-block;
  font-size: 0.75em;
  padding: 3px 9px;
  border-radius: 20px;
  border: 1px solid ${(props) => props.theme.color};
  opacity: 0.7;
  margin-top: 6px;
`;

const DateRange = styled.div`
  font-size: 0.8em;
  opacity: 0.55;
  margin-top: 4px;
  margin-bottom: 4px;
`;

const VolunteerProjectDescription = styled.p`
  font-size: 1em;
  line-height: 1.4;
  margin-top: 12px;
`;

const VolunteerProjectLink = styled.a`
  display: inline-block;
  margin-top: 10px;
  color: ${(props) => props.theme.linkColor};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const MonetaryImpact = styled.div`
  margin-top: 15px;
  font-size: 0.9em;
  color: ${(props) => props.theme.textSecondary || '#888'};
  font-style: italic;
`;

const TestimonialOrStatus = styled.div`
  margin-top: 15px;
  font-size: 0.9em;
  color: ${(props) => props.theme.textSecondary || '#888'};
  font-style: italic;
  line-height: 1.6;
  text-align: center;
`;

const ReadMoreButton = styled.button`
  display: block;
  margin: 10px auto 0;
  background: none;
  border: none;
  color: ${(props) => props.theme.color || '#0073e6'};
  cursor: pointer;
  font-size: 0.9em;
  text-decoration: underline;
  &:hover {
    text-decoration: none;
  }
  &:focus {
    outline: 2px solid ${(props) => props.theme.linkColor || '#0073e6'};
  }
`;

const projects = [
  {
    title: 'NASA Space ROS',
    role: 'Technical Writer',
    dateRange: 'Jul 2024 – Sep 2024',
    description:
      'Contributed technical documentation for the Robot Operating System (ROS) framework for space-flight missions.',
    link: null,
    impact: null,
    testimonial: null,
  },
  {
    title: 'Zoe Ministries',
    role: 'Web Developer',
    dateRange: 'Sep 2024 – Feb 2025',
    description: 'Overhauled the website and database for a shelter supporting victims of sex trafficking.',
    link: 'https://zoe-delaware.org',
    impact: '$22,986 saved in tech costs',
    testimonial:
      'Damian worked very hard on our website and did it in a timely manner. He communicated in a timely manner and did everything that I asked and suggested of him from the very beginning. One of the easiest people to work with and he did so with such excellence.',
  },
  {
    title: 'International Children\'s Media Center',
    role: 'Junior Software Engineer',
    dateRange: 'Oct 2024 – Feb 2025',
    description:
      'Collaborated with two other web developers on the nonprofit\'s main website and flagship ScreenSmart program site, dedicated to transforming education by humanizing how children engage with digital devices.',
    link: 'https://icmediacenter.org/',
    impact: '$4,586 saved in tech costs',
    testimonial: 'In Progress',
  },
  {
    title: 'Re-Imagine Education',
    role: 'Web Developer',
    dateRange: null,
    description: 'Overhauled a website for a nonprofit that attracts BIPOC talent to education careers.',
    link: 'https://re-imagineed.org',
    impact: '$15,626 saved in tech costs',
    testimonial: `We had the privilege of working with Damian on a project to update the website for Re-Imagine Education, 
      and the experience was nothing short of outstanding. Damian brought an incredible level of professionalism, 
      creativity, and technical expertise to the table. From the start, Damian took the time to understand our 
      organization's mission and vision, ensuring the updated website truly reflected our goals. He was communicative, 
      patient, and consistently responsive, making the entire process smooth and collaborative. Damian went above and 
      beyond by not only enhancing the design and functionality of the site but also providing valuable insights on how 
      to optimize the user experience and make the platform more accessible to our audience. Thanks to Damian's hard 
      work, Re-Imagine Education now has a website that is modern, user-friendly, and effectively showcases our programs 
      and initiatives. The impact of his efforts will be felt for years to come as we continue to serve our community.`,
  },
];

const VolunteerProjects = () => {
  const [expanded, setExpanded] = useState({});

  const toggleReadMore = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div>
      <SectionTitle>Experience & Volunteer Work</SectionTitle>
      <SectionSubtitle>Technical roles, internships, and volunteer projects</SectionSubtitle>
      <VolunteerProjectsContainer>
        {projects.map((project, index) => (
          <VolunteerProjectCard key={index}>
            <VolunteerProjectTitle>{project.title}</VolunteerProjectTitle>
            {project.dateRange && <DateRange>{project.dateRange}</DateRange>}
            {project.role && <RoleBadge>{project.role}</RoleBadge>}
            <VolunteerProjectDescription>{project.description}</VolunteerProjectDescription>
            {project.link ? (
              <VolunteerProjectLink href={project.link} target="_blank" rel="noopener noreferrer">
                View Website ↗
              </VolunteerProjectLink>
            ) : (
              project.title !== 'NASA Space ROS' && (
                <TestimonialOrStatus>New Website Is Not Live</TestimonialOrStatus>
              )
            )}
            {project.impact && <MonetaryImpact>{project.impact}</MonetaryImpact>}
            {project.testimonial && (
              <>
                <TestimonialOrStatus>
                  {expanded[index] || project.testimonial.length <= 200
                    ? project.testimonial
                    : `${project.testimonial.slice(0, 200)}...`}
                </TestimonialOrStatus>
                {project.testimonial.length > 200 && (
                  <ReadMoreButton onClick={() => toggleReadMore(index)}>
                    {expanded[index] ? 'Read Less' : 'Read More'}
                  </ReadMoreButton>
                )}
              </>
            )}
          </VolunteerProjectCard>
        ))}
      </VolunteerProjectsContainer>
    </div>
  );
};

export default VolunteerProjects;