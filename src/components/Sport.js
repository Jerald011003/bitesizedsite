import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from './Rating';
import { Link } from 'react-router-dom';
import './News.css'; // import your CSS file

function Sport({ sportsitem }) {
  return (
<Card className="my-3 p-3 rounded bg-light text-white text-center">
      <Link to={`/sports/${sportsitem._id}`}>
      <Card.Img src={sportsitem.image} variant="top" style={{ width: '100%', height: '500px', objectFit: 'cover' }} />
      </Link>

      <Card.Body>
        <Link style={{ color: 'black', textDecoration: 'none' }} to={`/sports/${sportsitem._id}`}>
          <Card.Text as="h3">
            <strong>{sportsitem.headline}</strong>
          </Card.Text>
        </Link>

        

<Card.Text as="p" style={{color: 'black'}}>
  {sportsitem.description}
</Card.Text>
        

        <Link to={`/sports/${sportsitem._id}`} className="btn btn-primary">
          View Details
        </Link>
      </Card.Body>
    </Card>

    
  );
}

export default Sport;
