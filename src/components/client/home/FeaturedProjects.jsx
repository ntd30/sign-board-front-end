import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Button, Breadcrumb } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { fetchAllArticlesAPI } from '../../../services/api.service';

const { Title, Text } = Typography;

const FeaturedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  // Card styling to match ListProductCard
  const projectCardStyle = {
    transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
    borderRadius: '12px',
    overflow: 'hidden',
    background: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  };
  
  const projectCardHoverStyle = {
    transform: 'translateY(-10px)',
    boxShadow: '0 15px 30px rgba(0, 77, 64, 0.2)',
  };
  
  const cardImageStyle = {
    height: '220px',
    objectFit: 'cover',
    padding: '5px',
    borderBottom: '1px solid #f0f0f0'
  };
  
  const cardBodyStyle = {
    flexGrow: 1,
    padding: '16px'
  };
  
  const cardActionsStyle = {
    marginTop: 'auto',
    padding: '10px 16px',
    borderTop: '1px solid #f0f0f0'
  };

  useEffect(() => {
  const stripHtmlTags = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const loadProjects = async () => {
    setLoading(true);
    try {
      const res = await fetchAllArticlesAPI(1, 4, 'project');
      if (res.data && res.data.content) {
        const formattedProjects = res.data.content.map(project => {
          const rawSummary = project.summary;
          const rawContent = project.content;

          const cleanDescription = rawSummary
            ? stripHtmlTags(rawSummary)
            : rawContent
              ? stripHtmlTags(rawContent)
              : '';

          return {
            id: project.id,
            name: project.title,
            imageBase64: project.imageBase64,
            featuredImageUrl: project.featuredImageUrl,
            description: cleanDescription.substring(0, 100) + '...',
            rawData: project
          };
        });

        setProjects(formattedProjects);
      }
    } catch (error) {
      console.error("Error loading projects:", error);
    }
    setLoading(false);
  };

  loadProjects();
}, []);


  const handleProjectClick = (project) => {
    navigate("/news/detail", {
      state: { news: project.rawData },
    });
  };

  return (
<div style={{ maxWidth: "1200px", margin: "40px auto", padding: '0 20px' }}>
      

      <Title level={2} style={{ textAlign: 'center', marginBottom: '30px', color: '#004D40', fontWeight: 'bold' }}>
        Dự án tiêu biểu
      </Title>
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>
      ) : projects.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px', color: '#00796B', fontSize: '18px' }}>
          Hiện chưa có dự án nào để hiển thị.
        </div>
      ) : (
        <Row gutter={[24, 24]}>
          {projects.map((project) => (
<Col key={project.id} xs={12} sm={12} md={12} lg={6} style={{ display: 'flex' }}>
              <Card
                hoverable
                loading={loading}
                style={hoveredCard === project.id ? { ...projectCardStyle, ...projectCardHoverStyle } : projectCardStyle}
                onMouseEnter={() => setHoveredCard(project.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleProjectClick(project)}
                cover={
                  <img
                    alt={project.name}
                    src={
                      project.imageBase64
                        ? `data:image/jpeg;base64,${project.imageBase64}`
                        : project.featuredImageUrl
                          ? `${import.meta.env.VITE_BACKEND_URL || ''}/images/${project.featuredImageUrl}`
                          : "https://placehold.co/400x220/E0F2F1/00796B?text=Ảnh+Dự+Án"
                    }
                    style={cardImageStyle}
                  />
                }
                bodyStyle={cardBodyStyle}
                actions={[
                  <Button
                    type="primary"
                    style={{ 
                      backgroundColor: '#FF6F00', 
                      borderColor: '#FF6F00', 
                      fontWeight: 'bold', 
                      width: 'calc(100% - 32px)', 
                      margin: '0 16px' 
                    }}
                    onMouseEnter={(e) => { 
                      e.currentTarget.style.backgroundColor = '#FF8F00'; 
                      e.currentTarget.style.borderColor = '#FF8F00'; 
                    }}
                    onMouseLeave={(e) => { 
                      e.currentTarget.style.backgroundColor = '#FF6F00'; 
                      e.currentTarget.style.borderColor = '#FF6F00'; 
                    }}
                  >
                    Xem Chi Tiết
                  </Button>,
                ]}
              >
                <Card.Meta
                  title={
                    <Title
                      level={5}
                      style={{ 
                        color: '#004D40', 
                        minHeight: '44px', 
                        marginBottom: '8px', 
                        cursor: 'pointer' 
                      }}
                    >
                      {project.name}
                    </Title>
                  }
                  description={
                    <Text 
                      style={{ 
                        color: '#455A64', 
                        fontSize: '14px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {project.description}
                    </Text>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default FeaturedProjects;