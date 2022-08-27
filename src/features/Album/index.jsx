import { useSelector } from 'react-redux';
import AlbumList from './components/AlbumList';

AlbumFeature.propTypes = {};

function AlbumFeature(props) {
  const count = useSelector((state) => state.count);
  const albumList = [
    {
      id: 1,
      name: 'hay song het minh',
      thumbnail:
        'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/a/3/3/b/a33b672df9dcf5c0bec66e52886229c7.jpg',
    },
    {
      id: 2,
      name: 'hay song het minh',
      thumbnail:
        'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/a/3/3/b/a33b672df9dcf5c0bec66e52886229c7.jpg',
    },
    {
      id: 3,
      name: 'hay song het minh',
      thumbnail:
        'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/a/3/3/b/a33b672df9dcf5c0bec66e52886229c7.jpg',
    },
  ];

  return (
    <div>
      <h2>Co the ban thich day</h2>
      <AlbumList albumList={albumList} />
      <h2>counter: {count}</h2>
    </div>
  );
}

export default AlbumFeature;
