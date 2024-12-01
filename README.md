<div align="center" id="readme-top">
  <a href="https://github.com/d1azdn/posteo">
    <img src="..." alt="Logo" width="125" height="125">
  </a>
  <h3>Posteo</h3>
  <p>Postgresql, Prisma, Express, JWT learning example</p>
</div>

## About
<table>
<tr>
<td>
<details open>
<summary>Table of Contents</summary>
  <ol>
    <li><a href="#about">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>
</td>
</tr>
</table>

There are numerous examples of back-end development examples, and this project is my attempt to build one. Using PostgreSQL, Express, and Prisma, this project implements a simple CRUD (Create, Read, Update, Delete) application. I'm using Postman as API requests testing.

Project Highlights:
* Simple CRUD Operations, Implemented via endpoints using Express.
* Flexible Testing, Endpoints can be accessed using Postman or directly through an HTML interface.
* JWT implementation on example.

This project serves as a learning resource for back-end development. It aims to provide an accessible and straightforward example of CRUD operations, making it easier to understand the fundamentals of back-end development.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
* ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
* 	![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
* ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
* ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

<!-- For badges, you can check here. -->
<!--https://github.com/Ileriayo/markdown-badges-->


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

  ```sh
  npm install npm@latest -g
  ```

And make sure you already running postgresql on local, or you can use free postgresql hosting, then get the URL.

### Installation



1. Clone the repo
   ```sh
   git clone https://github.com/d1azdn/posteo.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `.env` (create file `.env` at your own)
   ```js
   DATABASE_URL = 'ENTER YOUR URL';
   SECRET_KEY = 'CREATE YOUR OWN SECRET KEY';
   ```
5. Change git remote url to avoid accidental pushes to base project
   ```sh
   git remote set-url origin github_username/repo_name
   git remote -v # confirm the changes
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

1. Run the project in your terminal
```js
npx ts-node ./index.ts
```

2. For the list of endpoint, you can check `post-routes.ts`, or check the documentation [link here](https://diazdn-source.online/posteo).

_For more examples of endpoint, please refer to the [Documentation](https://diazdn-source.online/posteo)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP
## Roadmap

- [x] Add Changelog
- [x] Add back to top links
- [ ] Add Additional Templates w/ Examples
- [ ] Add "components" document to easily copy & paste sections of the readme
- [ ] Multi-language Support
    - [ ] Chinese
    - [ ] Spanish

See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


<!-- ### Top contributors:

<a href="https://github.com/othneildrew/Best-README-Template/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=othneildrew/Best-README-Template" alt="contrib.rocks image" />
</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Diaz Saputra - [@d1azdn](https://instagram.com/d1azdn) - diazsaputramc@gmail.com

Project Link: [https://github.com/d1azdn/posteo](https://github.com/d1azdn/posteo)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS
## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
* [Malven's Grid Cheatsheet](https://grid.malven.co/)
* [Img Shields](https://shields.io)
* [GitHub Pages](https://pages.github.com)
* [Font Awesome](https://fontawesome.com)
* [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->