import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPlaylist, deletePlaylist, listPlaylists } from '../actions/playlistActions';
import './Playlist.css'
import { listSongDetails } from '../actions/songActions';
import { addToPreorder, removeFromPreorder } from '../actions/preorderActions';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
const Playlist = ({ match, location, history }) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [link, setLink] = useState('');
  // const [qty, setQty] = useState(1);
  const [createDisabled, setCreateDisabled] = useState(false);

  const dispatch = useDispatch();
  const { loading, error, playlists } = useSelector((state) => state.playlistList);

  useEffect(() => {
    dispatch(listPlaylists());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingPlaylist = playlists.find((p) => p.title === title);
    if (existingPlaylist) {
      alert('You can only create one playlist!');
      return;
    }
    dispatch(createPlaylist({ title, image, link }));
    setTitle('');
    setImage(null);
    setLink('');
    setCreateDisabled(true);
  };

  const handleDelete = (id) => {
    dispatch(deletePlaylist(id)).then(() => {
      dispatch(listPlaylists());
    });
  };

  // const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);

  // const dispatch = useDispatch();

  const songId = match.params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;
  // const dispatch = useDispatch();

  const preorder = useSelector(state => state.preorder);
  const { preorderItems } = preorder;

  useEffect(() => {
    if (songId) {
      dispatch(addToPreorder(songId, qty));
    }
  }, [dispatch, songId, qty]);

  const removeFromPreorderHandler = (id) => {
    dispatch(removeFromPreorder(id));
  };

  const songDetails = useSelector(state => state.songDetails);
  const { song } = songDetails;

  return (
    <div className="playlist">
     <h1 className="playlist__title">Create Playlist</h1>
    <form className="playlist__form" onSubmit={handleSubmit}>
      <div className="playlist__form-group">
        <label className="playlist__label" htmlFor='title'>Title</label>
        <input
          className="playlist__input"
          type='text'
          id='title'
          placeholder='Enter playlist title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="playlist__form-group">
        <label className="playlist__label" htmlFor='image'>Image</label>
        <input
          className="playlist__input"
          type='file'
          id='image'
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>
      <div className="playlist__form-group">
        <p>Note: You can only create one playlist!</p>
      </div>
      <button className="playlist__button" type='submit' disabled={createDisabled}>Create Playlist</button>
      </form>
      {loading ? (
      <div className="playlist__message">Loading...</div>
    ) : error ? (
      <div className="playlist__message">{error}</div>
    ) : (
      <div>
        <h2 className="playlist__title">Playlist List</h2>
        <ul className="playlist__list">
          {playlists.map((playlist) => (
            <li className="playlist__item" key={playlist.id}>
              <div>{playlist.title}</div>
              {playlist.songs && (
                <ul className="playlist__song-list">
                  {playlist.songs.map((song) => (
                    <li className="playlist__song-item" key={song.id}>
                      {song.title} by {song.artist}
                    </li>
                  ))}
                </ul>
              )}
              {playlist.image && (
                              <LinkContainer to="/playlist">
            <Navbar.Brand>

              
                  <img className="playlist__image" src={playlist.image} alt={playlist.title} />
              
         </Navbar.Brand>
           </LinkContainer>
              )}
              <button className="playlist__button" onClick={() => handleDelete(playlist.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    )}
    </div>
  );
};

export default Playlist;
