import React, { useState } from 'react';
import styled from 'styled-components';

// Styled components remain unchanged
const VolunteerProjectsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 50px 20px;
  background-color: transparent;
`;

const VolunteerProjectCard = styled.div`
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px ${(props) => props.theme.boxShadowColor};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 10px ${(props) => props.theme.boxShadowColor};
  }
`;

const VolunteerProjectTitle = styled.h2`
  margin-top: 0;
`;

const VolunteerProjectDescription = styled.p`
  font-size: 1em;
  line-height: 1.4;
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

const VolunteerProjects = () => {
  const [expanded, setExpanded] = useState({});

  const toggleReadMore = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const projects = [
    {
      title: "Zoe Ministries",
      description: "Overhauled the website and database for a shelter supporting victims of sex trafficking.",
      link: "https://zoe-delaware.org",
      impact: "$22,986 saved in tech costs",
      testimonial: "Damian worked very hard on our website and did it in a timely manner. He communicated in a timely manner and did everything that I asked and suggested of him from the very beginning. One of the easiest people to work with and he did so with such excellence.",
    },
    {
      title: "Dutchtown South Community Center",
      description: "Created a new website for a non-profit that advances neighborhood vitality through community empowerment, housing stabilization & real estate development.",
      link: null,
      impact: "$16,822 saved in tech costs",
      testimonial: "Damian was efficient and followed our web wireframe well. Damian was open to flexible changes.",
    },
    {
      title: "Re-Imagine Education",
      description: "Overhauled a website for a non-profit that attracts BIPOC talent to education careers.",
      link: "https://re-imagineed.org",
      impact: "$15,626 saved in tech costs",
      testimonial: `We had the privilege of working with Damian on a project to update the website for Re-Imagine Education, 
      and the experience was nothing short of outstanding. Damian brought an incredible level of professionalism, 
      creativity, and technical expertise to the table. From the start, Damian took the time to understand our 
      organization’s mission and vision, ensuring the updated website truly reflected our goals. He was communicative, 
      patient, and consistently responsive, making the entire process smooth and collaborative. Damian went above and 
      beyond by not only enhancing the design and functionality of the site but also providing valuable insights on how 
      to optimize the user experience and make the platform more accessible to our audience. Thanks to Damian’s hard 
      work, Re-Imagine Education now has a website that is modern, user-friendly, and effectively showcases our programs 
      and initiatives. The impact of his efforts will be felt for years to come as we continue to serve our community.`,
    },
    {
      title: "Internation Children's Media Center",
      description: "Collaborating with two other web developers to finish a nonprofit's main website, which is dedicated to transforming education by humanizing the way children and youth engage with digital devices. Together, we are also creating the website for the flagship program, Screen Smart, using WordPress.",
      link: "https://icmediacenter.org/",
      impact: "$4,586 saved in tech costs",
      testimonial: "In Progress",
    },
  ];

  return (
    <VolunteerProjectsContainer>
      {projects.map((project, index) => (
        <VolunteerProjectCard key={index}>
          <VolunteerProjectTitle>{project.title}</VolunteerProjectTitle>
          <VolunteerProjectDescription>{project.description}</VolunteerProjectDescription>
          {project.link ? (
            <VolunteerProjectLink
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Website
            </VolunteerProjectLink>
          ) : (
            <TestimonialOrStatus>New Website Is Not Live</TestimonialOrStatus>
          )}
          {project.impact && <MonetaryImpact>{project.impact}</MonetaryImpact>}
          <TestimonialOrStatus>
            {expanded[index] || project.testimonial.length <= 200
              ? project.testimonial
              : `${project.testimonial.slice(0, 200)}...`}
          </TestimonialOrStatus>
          {project.testimonial.length > 200 && (
            <ReadMoreButton onClick={() => toggleReadMore(index)}>
              {expanded[index] ? "Read Less" : "Read More"}
            </ReadMoreButton>
          )}
        </VolunteerProjectCard>
      ))}
    </VolunteerProjectsContainer>
  );
};

export default VolunteerProjects;
