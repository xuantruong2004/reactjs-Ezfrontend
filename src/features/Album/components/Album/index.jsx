import React from "react";
import PropTypes from "prop-types";
import "../../styles.scss";
Album.propTypes = {
  album: PropTypes.object,
};
function Album({ album, onClick }) {
  return (
    <div className="album">
      <img className="img" src={album.thumbnail} alt={album.name} />
      <p>{album.name}</p>
    </div>
  );
}

export default Album;
