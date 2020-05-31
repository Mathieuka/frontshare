import fetch from "node-fetch";

interface Album {
  userId: number | string;
  id: number | string;
  title: string;
}

enum AlbumProperties {
  userId = "userId",
  id = "id",
  title = "title",
}

const albumPropertiesSelector = (property: AlbumProperties) => (
  album: Album
): string | number => {
  return album[property];
};

const stringify = (el: number): string => JSON.stringify(el);

const upperCaseFirstLetter = (str: string): string =>
  `${str[0].toUpperCase()}${str.slice(1)}`;

const removeLetter = (letterToBeDeleted: string) => (str: string): string =>
  str
    .split("")
    .filter((letter) => letter !== letterToBeDeleted)
    .join("");

const removedSpecificLetter = removeLetter.bind(null);

const stringifyIds = stringify.bind(null);

const stringifyUserId = stringify.bind(null);

const upperCaseFirstLetterOfTitle = upperCaseFirstLetter.bind(null);

const buildAlbums = (ids: string[], titles: string[], userIds: string[]) => (
  album: Album,
  index: number
): Album => {
  album.id = ids[index];
  album.title = titles[index];
  album.userId = userIds[index];
  console.log(album);
  return album;
};

const startApp = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/albums");
  const albums = await response.json();

  const albumsIds = albums
    .map(albumPropertiesSelector(AlbumProperties.id))
    .map(stringifyIds);

  const albumsTitles = albums
    .map(albumPropertiesSelector(AlbumProperties.title))
    .map(upperCaseFirstLetterOfTitle)
    .map(removedSpecificLetter("a"));

  const albumsUserIds = albums
    .map(albumPropertiesSelector(AlbumProperties.userId))
    .map(stringifyUserId);

  const albumsBuilded = albums.map(
    buildAlbums(albumsIds, albumsTitles, albumsUserIds)
  );

  return albumsBuilded;
};

startApp();
