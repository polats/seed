# Budokai.io

[Budokai.io](http://www.budokai.io) is a multiplayer VR experience, playable even on non-VR platforms by using [adaptive VR game design](https://medium.com/@polats/adaptive-vr-game-design-the-case-for-a-standard-3dof-controller-5a55c8cde560).

Agar.io and Slither.io showed the world that you don't need downloaded apps to play compelling games.  Browsers have all the technology you need!

[Budokai.io](http://www.budokai.io) takes .io games to the next level. By using WebVR via Aframe,  WebRTC for controller syncing and Websockets for multiplayer communication, we created a pick up and play VR experience you can play even without a VR headset. We maintain our VR-designed experience on non-VR platforms by using either the daydream remote or their mobile phone as a controller.

### Made With:

* [A-Frame](https://aframe.io/) for WebVR development
* [Lance.gg](http://lance.gg/) for multiplayer backend
* [Proxycontrols.js](https://proxy-controls.donmccurdy.com/) and [webvr-remote](https://github.com/povdocs/webvr-remote) for mobile remote phone code
* [Daydream-controller.js](https://github.com/mrdoob/daydream-controller.js/) for Daydream remote support
* Assets from A-frame examples

### Aframe Components created for project:
* [**Dash Move Controls**](https://github.com/polats/aframe-dash-move-controls-component) - allows mouse and daydream movement, adds velocity trails
* [**Remote Phone Controls**](https://github.com/polats/aframe-remote-phone-controls-component) - based on Proxycontrols.js, allows mobile phone to be used as controller

## Thoughts on VR Game Development

* What's really holding VR back is the small addressable market -- people without VR headsets being unable to play. I believe Chrome + WebVR is the open platform that will allow VR to go mainstream.



* Aside from presence via the VR headset, one thing that makes VR a unique and compelling platform is the higher fidelity of user input.  I've found that VR experiences aren't compelling because I play them with a headset on, but more so because of the level of agency that a VR controller provides. The moment I saw my hands in leap motion was more powerful than seeing the Oculus Rift Tuscany House for the first time.



* I believe there should be a controller that can be used for both VR and non-VR. Perhaps Google can make the Daydream Remote work officially on desktop, or maybe there could be a mouse add-on that adds gyroscope input. If this cross-platform solution becomes as ubiquitous as a mouse, people would be more inclined to both consume and produce VR content.


* More on [Medium](https://medium.com/@polats/adaptive-vr-game-design-the-case-for-a-standard-3dof-controller-5a55c8cde560)
