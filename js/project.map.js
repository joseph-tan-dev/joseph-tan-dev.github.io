"use strict";

/*********************
 *  Project Map script
 ********************/
// Using DOMReady function defined in skew.scroll.js. Make sure to include skew.scroll.js before this file
var projects = [{
  title: 'Sigsense Technologies',
  at: [590, 620],
  tech: ['React', 'Node', 'Docker', 'D3', 'Highcharts'],
  role: 'Lead Developer',
  thumb: 'sigsense_machine_learning.png',
  link: 'https://www.sigsensetech.com',
  icon: '/img/project-icons/sigsense.png'
}, {
  title: 'Airnest',
  at: [400, 450],
  tech: ['React', 'React Native', 'Python', 'Mapbox'],
  role: 'React / Python Engineer, React Native Lead',
  thumb: 'thumbs/airnest-trans.png',
  transparent: true,
  link: 'https://www.measure.com/drone-software/features',
  icon: '/img/project-icons/airnest.webp'
}, {
  title: 'Robot Riot',
  at: [310, 310],
  tech: ['Python', 'TDD', 'SOLID', 'Leaderboard'],
  role: 'Python Developer',
  thumb: 'thumbs/fishing-screen.png',
  link: 'https://www.robotriotgames.com',
  icon: '/img/project-icons/robotriot.ico'
}, {
  title: 'DigiPro, Inc',
  at: [500, 750],
  tech: ['Node', 'Express', 'Mongoose', 'Docker'],
  role: 'Node Developer (via Toptal)',
  thumb: 'thumbs/digipro.png',
  link: 'https://www.digi-inc.com',
  icon: '/img/project-icons/digipro.jpeg'
}, {
  title: 'Acuity Scheduling',
  at: [500, 500],
  tech: ['React', 'Node', 'React Native', 'GraphQL'],
  role: 'React / React Native / GraphQL Developer (via Toptal)',
  thumb: 'thumbs/acuity.png',
  link: 'https://www.acuityscheduling.com',
  icon: '/img/project-icons/acuity-scheduling.png'
}, {
  title: 'Simple.Space',
  at: [430, 370],
  tech: ['React', 'Python', 'Sidekiq', 'HAML'],
  role: 'Python / React Engineer',
  thumb: 'thumbs/ss.png',
  link: 'https://www.simple.space',
  icon: '/img/project-icons/simplespace.png'
}, {
  title: 'Project Map It',
  at: [540, 660],
  tech: ['React', 'Node', 'Oauth2', 'Mongoose', 'Google Maps'],
  role: 'React / Node Developer',
  thumb: 'thumbs/pmit.png',
  link: 'https://www.projectmap.it',
  icon: '/img/project-icons/mapit.png',
  iconSize: [20,30],
}, {
  title: 'Strive for College',
  at: [450, 610],
  tech: ['React', 'Node', 'React Native', 'Firebase', 'Twilio', 'GraphQL'],
  role: 'Volunteer',
  thumb: 'thumbs/ustrive.png',
  transparent: true,
  link: 'https://www.ustrive.com',
  icon: '/img/project-icons/strive.jpg'
}, {
  title: 'Linux Academy',
  at: [350, 430],
  tech: ['React', 'Python', 'D3'],
  role: 'Contractor (via Toptal)',
  thumb: 'thumbs/linux.png',
  transparent: true,
  link: 'https://www.linuxacademy.com',
  icon: '/img/project-icons/linuxacademy.jpg'
}, {
  title: 'Belmont Technology',
  at: [600, 400],
  tech: ['React', 'D3', 'Mapbox', 'Leaflet'],
  role: 'Contractor (via Toptal)',
  thumb: 'thumbs/belmont.jpg',
  transparent: true,
  link: 'https://www.b15y.io',
  icon: '/img/project-icons/belmont.webp'
}];
var techs = [{
  key: 'react',
  imgUrl: '/img/tech-icons/react.png',
  focus: [500, 500]
}, {
  key: 'node',
  imgUrl: '/img/tech-icons/node.png',
  focus: [500, 700]
}, {
  key: 'rails',
  imgUrl: '/img/tech-icons/rails.png',
  focus: [350, 350]
}];
var areas = {};

var TechButton = function TechButton(tech) {
  return L.Control.extend({
    options: {
      position: 'topleft'
    },
    onAdd: function onAdd(map) {
      var container = L.DomUtil.create('div', 'proj-map-tech-btn'); // container.style.backgroundColor = 'white';

      container.style.backgroundImage = "url(".concat(tech.imgUrl, ")");
      container.style.backgroundSize = "30px 30px";
      container.style.width = '30px';
      container.style.height = '30px';

      container.onclick = function () {
        map.panTo(tech.focus);

        for (var areaKey in areas) {
          if (areaKey !== tech.key) {
            areas[areaKey].setStyle({
              stroke: false
            });
          } else {
            areas[areaKey].setStyle({
              stroke: true
            });
          }
        }
      };

      return container;
    }
  });
};

var generateProjContent = function generateProjContent(proj) {
  return "\n    <h5>".concat(proj.title, "</h5>\n    <div class=\"pm-role\">").concat(proj.role, "</div>\n    <ul class=\"pm-tech\">").concat(proj.tech.map(function (t) {
    return '<li>' + t + '</li>';
  }).join(''), "</ul>\n    <img class=\"pm-thumb ").concat(proj.transparent ? 'no-border' : '', "\" src=\"img/portfolio/").concat(proj.thumb, "\" alt=\"Screenshot\" />\n    <div class=\"pm-vacancy\"></div>\n    <a class=\"pm-link\" href=\"").concat(proj.link, "\" target=\"_blank\">Go to ").concat(proj.title, "</a>\n  ");
};

var initMap = function initMap() {
  var map = L.map('pmap', {
    crs: L.CRS.Simple,
    zoomControl: false
  });
  var bounds = [[0, 0], [1000, 1000]];
  var tile = L.tileLayer('/img/map-bk.jpg').addTo(map);
  map.fitBounds(bounds); // Python

  areas['rails'] = L.circle([350, 350], {
    radius: 150,
    color: '#C7090F',
    stroke: false
  }).addTo(map); // Node

  areas['node'] = L.circle([500, 700], {
    radius: 150,
    color: '#87C024',
    stroke: false
  }).addTo(map); // React

  areas['react'] = L.circle([500, 500], {
    radius: 200,
    color: '#5ED5F4',
    stroke: false
  }).addTo(map); // React Native

  L.circle([460, 540], {
    radius: 130,
    color: '#5ED5F4',
    stroke: false
  }).addTo(map);
  var pane = map.createPane('fixed', document.getElementById('pmap')); // Projects

  for (var _i = 0, _projects = projects; _i < _projects.length; _i++) {
    var proj = _projects[_i];
    var tooltip = L.tooltip({
      direction: 'bottom',
      className: 'proj-tooltip',
      offset: [0, 10]
    }).setContent(proj.title);
    var marker = L.marker(L.latLng(proj.at), {
      icon: L.icon({
        iconUrl: proj.icon,
        iconSize: proj.iconSize || [30, 30]
      })
    }).bindTooltip(tooltip).addTo(map);
    var popup = L.popup({
      pane: 'fixed',
      className: 'popup-fixed',
      autoPan: false
    }).setContent(generateProjContent(proj));
    marker.bindPopup(popup);
  } // Tech buttons


  for (var _i2 = 0, _techs = techs; _i2 < _techs.length; _i2++) {
    var tech = _techs[_i2];
    map.addControl(new (TechButton(tech))());
  }
};

DOMReady(initMap);