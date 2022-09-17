//@ts-check
const normalizr = require("normalizr");
const schema = normalizr.schema;
const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;

const originalData = {
  id: "999",
  posts: [
    {
      id: "123",
      author: {
        id: "1",
        nombre: "Pablo",
        apellido: "Perez",
        DNI: "20442654",
        direccion: "CABA 123",
        telefono: "1567876547",
      },
      title: "My awesome blog post",
      comments: [
        {
          id: "324",
          commenter: {
            id: "2",
            nombre: "Nicole",
            apellido: "Gonzalez",
            DNI: "20442638",
            direccion: "CABA 456",
            telefono: "1567811543",
          },
        },
        {
          id: "325",
          commenter: {
            id: "3",
            nombre: "Pedro",
            apellido: "Mei",
            DNI: "20446938",
            direccion: "CABA 789",
            telefono: "1567291542",
          },
        },
      ],
    },
    {
      id: "1123",
      author: {
        id: "2",
        nombre: "Nicole",
        apellido: "Gonzalez",
        DNI: "20442638",
        direccion: "CABA 456",
        telefono: "1567811543",
      },
      title: "My awesome blog post",
      comments: [
        {
          id: "1324",
          commenter: {
            id: "1",
            nombre: "Pablo",
            apellido: "Perez",
            DNI: "20442654",
            direccion: "CABA 123",
            telefono: "1567876547",
          },
        },
        {
          id: "1325",
          commenter: {
            id: "3",
            nombre: "Pedro",
            apellido: "Mei",
            DNI: "20446938",
            direccion: "CABA 789",
            telefono: "1567291542",
          },
        },
      ],
    },
    {
      id: "2123",
      author: {
        id: "3",
        nombre: "Pedro",
        apellido: "Mei",
        DNI: "20446938",
        direccion: "CABA 789",
        telefono: "1567291542",
      },
      title: "My awesome blog post",
      comments: [
        {
          id: "2324",
          commenter: {
            id: "2",
            nombre: "Nicole",
            apellido: "Gonzalez",
            DNI: "20442638",
            direccion: "CABA 456",
            telefono: "1567811543",
          },
        },
        {
          id: "2325",
          commenter: {
            id: "1",
            nombre: "Pablo",
            apellido: "Perez",
            DNI: "20442654",
            direccion: "CABA 123",
            telefono: "1567876547",
          },
        },
      ],
    },
  ],
};

const user = new schema.Entity("users");
const comment = new schema.Entity("comments", {
  commenter: user,
});
const artice = new schema.Entity("artices", {
  author: user,
  comments: [comment],
});

const posts = new schema.Entity("posts", {
  posts: [artice],
});

console.log(JSON.stringify(originalData));
const dataNormalized = normalize(originalData, posts);

console.log(JSON.stringify(dataNormalized));

console.log({
  entities: {
    users: {
      1: {
        id: "1",
        nombre: "Pablo",
        apellido: "Perez",
        DNI: "20442654",
        direccion: "CABA 123",
        telefono: "1567876547",
      },
      2: {
        id: "2",
        nombre: "Nicole",
        apellido: "Gonzalez",
        DNI: "20442638",
        direccion: "CABA 456",
        telefono: "1567811543",
      },
      3: {
        id: "3",
        nombre: "Pedro",
        apellido: "Mei",
        DNI: "20446938",
        direccion: "CABA 789",
        telefono: "1567291542",
      },
    },
    comments: {
      324: { id: "324", commenter: "2" },
      325: { id: "325", commenter: "3" },
      1324: { id: "1324", commenter: "1" },
      1325: { id: "1325", commenter: "3" },
      2324: { id: "2324", commenter: "2" },
      2325: { id: "2325", commenter: "1" },
    },
    artices: {
      123: {
        id: "123",
        author: "1",
        title: "My awesome blog post",
        comments: ["324", "325"],
      },
      1123: {
        id: "1123",
        author: "2",
        title: "My awesome blog post",
        comments: ["1324", "1325"],
      },
      2123: {
        id: "2123",
        author: "3",
        title: "My awesome blog post",
        comments: ["2324", "2325"],
      },
    },
    posts: { 999: { id: "999", posts: ["123", "1123", "2123"] } },
  },
  result: "999",
});

/* const normalizedBlogpost = normalize(blogpost, postSchema);

console.log(normalizedBlogpost);

const denormalizedBlogpost = denormalize(
  normalizedBlogpost.result,
  postSchema,
  normalizedBlogpost.entities
);

console.log(denormalizedBlogpost); */
