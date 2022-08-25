import React from "react";
import PropTypes from "prop-types";
import Album from "../Album";
import "../../styles.scss";

AlbumList.propTypes = {
  albumList: PropTypes.array,
};

function AlbumList({ albumList }) {
  return (
    <ul className="wrapper">
      {albumList.map((album) => (
        <Album key={album.id} album={album} />
      ))}
    </ul>
  );
}

export default AlbumList;
