<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />

<div align="center">
  <a href="https://github.com/justsayyes271/exposure-notifier">
        <img src="readme-images/logo.png" alt="Logo" width="80" height="80">
  </a>


  <h3 align="center">Exposure Notifier</h3>



  <p align="center">
    An COVID Exposure Notifier!
    <br />
    <br />
    <a href="https://macoredroid295homework.com/#/">View Demo</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
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
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Screen Shot][product-screenshot]](https://macoredroid295homework.com/#/)

Exposure notifier is an application that can allow you to
* scan QR code to visit place, 
* be notified as you status changes, and
* view COVID heatmap.

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [Vue.js](https://vuejs.org/)
  * [Vant 3](https://vant-contrib.gitee.io/vant/#/en-US/quickstart)
  * [Vue 3 Google Maps](https://vue-map.netlify.app/)
  * [Vue-ECharts](https://github.com/ecomfe/vue-echarts)
* [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm and vue-cli
  ```sh
  npm install npm@latest -g
  npm install -g @vue/cli
  ```

### Installation

1. Get a free API Key at Google Maps Platform [Google Maps Platform](https://developers.google.com/maps/documentation/javascript/)
2. Clone the repo
   ```sh
   git clone https://github.com/justsayyes271/exposure-notifier.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `main.js`
   ```js
    app.use(VueGoogleMaps, {
      load: {
        key: 'YOUR_MAPS_API_KEY',
        libraries: 'visualization',
      },
    });
   ```
### Compiles and hot-reloads for development
   ```sh
   npm run serve
   ```
### Compiles and minifies for production
   ```sh
   npm run build
   ```
### Lints and fixes files
   ```sh
   npm run lint
   ```
### Docker
   It depends on your docker file and registry.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

[![Usage Screen Shot][usage-screenshot]](https://macoredroid295homework.com/#/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Add Scan Qr Code
- [x] Add Apply QR Code with Location
- [x] Add Login
- [x] Add Status
- [x] Add Heatmap
- [x] Add Readme
- [x] Add Stats Graph
    - [ ] Line Graph
- [ ] Visit suggestions
- [ ] PWA Application

See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the GPLv3 License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Haomin Qiu - haominqiu@gmail.com

Project Link: [https://github.com/justsayyes271/exposure-notifier](https://github.com/justsayyes271/exposure-notifier)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [Iconfont](https://www.iconfont.cn/)
* [Iconoir](https://iconoir.com/)
* [Awesome Readme](https://github.com/othneildrew/Best-README-Template)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[license-shield]: https://img.shields.io/badge/License-GPLv3-blue.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/haominqiu/
[product-screenshot]: readme-images/screenshot.png
[usage-screenshot]: readme-images/usage.png
