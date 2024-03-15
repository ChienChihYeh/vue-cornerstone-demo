# vue-cornerstone-demo

See live demo at [https://vue-cornerstone-demo.vercel.app/](https://vue-cornerstone-demo.vercel.app/)

**Note: The demo is currently optimized for desktop**

This repository contains live demo showcasing the integration of Cornerstone3D into a Vue application. It features:

- Setting up and initializing Cornerstone3D in the application properly
- Configuring the new DICOM image loader for Cornerstone3D
- Customizing and registering web image loader for Cornerstone3D
- Displaying DICOM image stack
- Parsing metadata from DICOM images
- Displaying web images
- Providing metadata for web images (necessary for web image display)
- Basic initialization, toggle, and usage of Cornerstone3D tools
- Listening for Cornerstone3D and Cornerstone3D tools events
- Interacting with rendering engines, viewports, tool groups, and elements within the context of Cornerstone3D
- Abstraction of tools, event handlers, and configuration to hooks and helper functions
- Using Cornerstone3D with Typescript and providing necessary type declarations
- Creating type declaration file for DICOM image loader

### Resources

- [Cornerstone3D Documentation](https://www.cornerstonejs.org/)
- [Cornerstone3D Repository](https://github.com/cornerstonejs/cornerstone3D)
- [DICOM Library](https://www.dicomlibrary.com/)
- [vue-cornerstone-project](https://github.com/ChienChihYeh/vue-cornerstone-project) - a code example for adding JWT authentication to image loaders

### Side Note

I created this demo because I couldn't find any online demo for integrating Cornerstone3D into a Vue application, and I hope this demo will be helpful in kick-starting your Vue-Cornerstone3D projects. The demo is kept simple for clarification, but you can use the concept to scale up and create a feature-rich viewer. Let me know if you come across another interesting demo, find other resources, or have ideas for improving this one!
