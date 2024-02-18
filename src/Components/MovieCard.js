import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red, grey } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';



const ExpandMore = ({ expand, onClick, ariaExpanded, ariaLabel }) => (
  <IconButton onClick={onClick} aria-expanded={ariaExpanded} aria-label={ariaLabel}>
    <ExpandMoreIcon />
  </IconButton>
);

const MovieCard = ({ movie , onDeleteMovie}) => {
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likes, setLikes] = useState(movie.likes);
  const [dislikes, setDislikes] = useState(movie.dislikes);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLikeClick = () => {
    if (liked) {
      // Si déjà aimé, annuler le like
      setLiked(false);
      setLikes(likes - 1);
    } else if (!disliked) {
      // Sinon, si n'a pas déjà été disliké, ajouter un like
      setLiked(true);
      setLikes(likes + 1);
    } else {
      // Si déjà disliké, annuler le dislike et ajouter un like
      setDisliked(false);
      setLiked(true);
      setDislikes(dislikes - 1);
      setLikes(likes + 1);
    }
  };

  const handleDislikeClick = () => {
    if (disliked) {
      // Si déjà disliké, annuler le dislike
      setDisliked(false);
      setDislikes(dislikes - 1);
    } else if (!liked) {
      // Sinon, si n'a pas déjà été liké, ajouter un dislike
      setDisliked(true);
      setDislikes(dislikes + 1);
    } else {
      // Si déjà liké, annuler le like et ajouter un dislike
      setLiked(false);
      setDisliked(true);
      setLikes(likes - 1);
      setDislikes(dislikes + 1);
    }
  };
  const handleDeleteClick = () => {
    // Utilisez la fonction onDeleteMovie pour supprimer le film
    onDeleteMovie(movie.id);
  };
  return (
    
    <Card
    className="movie-card" 
    sx={{
      maxWidth: 500,
      transition: 'background-color 0.3s ease-in-out',
      backgroundColor: liked || disliked ? 'black' : '#000',  // Couleur de fond noire
      color: liked || disliked ? 'white' : 'white',  // Couleur du texte en blanc
      '&:hover': {
        backgroundColor: '#e0e0e0',
        boxShadow: '0px 0px 10px 5px rgba(255, 0, 0, 0.7)',
      },
    }}
  >
      <CardHeader
       
        
        title={
          <Typography variant="h6" sx={{ fontWeight: 'bold' , color : 'red'}}>
            {movie.title}
          </Typography>
        }
        subheader={`Likes: ${likes} / Dislikes: ${dislikes}`}
      />
      <CardMedia
        component="img"
        height="199"
        image={movie.image}
        alt={movie.title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {movie.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={handleLikeClick}
          sx={{ color: liked ? red[500] : 'inherit' }}
        >
          <FavoriteIcon />
        </IconButton>
        <Typography>{likes}</Typography>
        <IconButton
          aria-label="dislike"
          onClick={handleDislikeClick}
          sx={{ color: disliked ? grey[700] : 'inherit' }}
        >
          <ThumbDownIcon />
        </IconButton>
        <Typography>{dislikes}</Typography>
        <IconButton aria-label="delete" size="large" onClick={handleDeleteClick}
         sx={{
            color: grey[50],
          }}
        >
         
          <DeleteIcon />
        </IconButton>
        
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{movie.method}</Typography>
        </CardContent>
      </Collapse>


      
    </Card>
  );
};

export default MovieCard;
