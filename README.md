# Make Parties Angular Frontend

A frontend designed to work with my [Spring Boot Make Parties backend](https://github.com/jdegand/make-parties-spring-backend).   

## Built With

- [Angular](https://angular.io)
- [Angular CLI](https://github.com/angular/angular-cli) - version 16.0.1.
- [Angular Material](https://material.angular.io/)

## Thoughts

- I thought this would be a nice test of my Spring and Angular skills.
- [MakeParties](https://makeschool.org/mediabook/oa/tutorials/make-tweets/start-an-express-project-z9Y=/) design translates well to them.
- I adhered to the design of the MakeSchool tutorial and replicated it with slight differences.
- I used standalone components except for the app component.
- I used reactive forms and patchValue to set pre-filled values for the update event form.
- You could put services in sub-folders, ie `service/events/events.service.ts` and you could change the service names; the way I named them resulted in the class being initially called ApiServiceService.
- I used mock data to work out some styling for event fields versus always having to have the spring backend running.  The mockData implementation is commented out in the events component.
- Mostly had the backend complete (sans rsvps routes) when I started creating the frontend.
- I added validation first to the frontend and then applied that to the backend.
- Made the footer and header fixed - added scroll for the events component's body.
- There was overscroll at the end of events list because of margin placed between events -> used a last variable to remove the margin from the last of event-cards -> using :last-of-type did not work.
- Used [lorem picsum](https://picsum.photos/) for placeholder image urls -> could use many other similar services or even upload your own images to cloudinary.
- No validation for the image urls - placeholder image from Flaticon is displayed if user fails to provide an imgUrl.
- I used async pipe for the events -> can be drawbacks to using async pipe -> See this [video](https://www.youtube.com/watch?v=Z9U9-VRN_XU) for more.
- I used [min] on the Date field although I am using Validators - better to use a custom Validator instead ? 
- Using [min] is a lot easier to implement, but it is not consistent with how I am validating all the other fields.
- Used a fair amount of components -> possible to clean up and have better component reuse?
- On event-detail page, I added an extra link for the rsvp form.
- Debatable if it is better to use routerLink over mat-buttons that are styled like links.
- Angular material can have accessiblity issues.
- I didn't go overboard on styling - using a sticky footer presented some difficulty on mobile as the footer overlaps the card when there are multiple events.  I changed the footer from being stacked in a flex column in the left corner to using row and  justify-content:space-between.  On mobile, this choice causes word wrap because the footer text is too long. 
- Could have used modals instead of routing to a form for updating or creating rsvps.
- I added a delete button to delete events on the event detail page.
- After deleting the event, the backend sent a string like `Event ${id} deleted`.
- This caused an error to be thrown in the frontend and this prevented the page from being reloaded as the complete callback would not run.
- I changed the backend to send JSON, and now it works as intended. 
- Could cap the event's image width to an even smaller amount - need object-fit:cover to preserve aspect ratio of image.
- I used a mat-card-image attribute on each event image.
- Changed from async pipe to regular subscription in events component.  With async pipe, it is more difficult to show a message when the subscription returns no data. 
- Angular 16 doesn't initialize a karma config file anymore.  Need to use `ng generate config karma`.
- Use `xdescribe` to skip a test block. Use `xit` to skip an individual test. 

## Continued Development

- TypeScript improvements
- Cypress / Testing
- Custom Validator for min Date
- Styling tweaks
- Accessibility concerns
- Code Consistency

## Useful Resources

- [Flaticon](https://www.flaticon.com/)
- [Lorem Picsum](https://picsum.photos/) 
- [Lorem Ipsum](https://loremipsum.io/21-of-the-best-placeholder-image-generators/) - placeholder image generators
- [Wikimedia](https://commons.wikimedia.org/wiki/File:Image_not_available.png) - image not available
- [Stack Overflow](https://stackoverflow.com/questions/45144023/angular-material-design-how-to-add-custom-button-color) - angular design custom button color
- [YouTube](https://www.youtube.com/watch?v=qOZOeu6YcJc) - Creating and Using Reactive Forms | Angular Forms | Angular 13+
- [Stack Overflow](https://stackoverflow.com/questions/52035029/set-mindate-maxdate-dynamically-on-html-datepicker) - min / max date datepicker
- [Stack Overflow](https://stackoverflow.com/questions/49284110/angular5-custom-validator-for-date-min) - custom validator for date min
- [Stack Overflow](https://stackoverflow.com/questions/46502294/angular-change-matinput-size) - matinput size
- [YouTube](https://www.youtube.com/watch?v=Z9U9-VRN_XU) - Async Pipe Is Broken in Angular
- [Stack Overflow](https://stackoverflow.com/questions/34088209/how-to-pass-object-from-one-component-to-another-in-angular-2) - pass object from one component to another
- [Stack Overflow](https://stackoverflow.com/questions/45997369/how-to-get-param-from-url-in-angular-4) - get param from url
- [RxJs](https://rxjs.dev/deprecations/subscribe-arguments) - subscribe arguments
- [Stack Overflow](https://stackoverflow.com/questions/63382484/how-to-init-default-values-for-angular-form-from-async-request-form-control) - how to set default values for angular form to async request data
- [Stack Overflow](https://stackoverflow.com/questions/55275025/how-to-set-value-to-form-control-in-reactive-forms-in-angular) - how to set value to form control in reactive forms in angular
- [Theme Isle](https://themeisle.com/blog/missing-images-on-website/) - missing images on website
- [Stack Overflow](https://stackoverflow.com/questions/4774022/whats-default-html-css-link-color) - default html css link color
- [Stack Overflow](https://stackoverflow.com/questions/46027652/typescript-interface-how-to-declare-a-property-of-array-type) - typescript interface how to declare a property of array type
- [Stack Overflow](https://stackoverflow.com/questions/53539728/how-to-validate-date-in-the-format-mm-dd-yyyy-in-spring-boot) - how to validate date in mm-dd-yyyy format
- [Stack Overflow](https://stackoverflow.com/questions/46502294/angular-change-matinput-size) - matinput size
- [Stack Overflow](https://stackoverflow.com/questions/35269179/angular-conditional-class-with-ngclass) - ngClass
- [Blog](https://blog.bitsrc.io/6-ways-to-unsubscribe-from-observables-in-angular-ab912819a78f) - 6 ways to unsubscribe
- [YouTube](https://www.youtube.com/watch?v=ddyxKtfOMqU) - takeUntilDestroyed
- [Stack Overflow](https://stackoverflow.com/questions/56767679/should-i-unsubscribe-after-a-complete) - should I unsubscribe after a complete
- [Stack Overflow](https://stackoverflow.com/questions/52198240/rxjs-difference-between-complete-and-unsubscribe-in-observable) - complete and unsubscribe difference
- [YouTube](https://www.youtube.com/watch?v=emnwsVy8wRs&list=PLoC8Q0moRTSiTBAKWBGiJjFUMpiFdaGdF&index=1&pp=iAQB) - Introduction | Angular Unit Testing
- [YouTube](https://www.youtube.com/watch?v=15othucRXcI) - 30. Testing Services which has HttpClient as dependency by using Jasmine Spy - Angular Unit testing
- [Angular Docs](https://angular.io/guide/testing-services) - testing services
- [Blog](https://offering.solutions/blog/articles/2017/10/02/testing-an-angular-http-service/) - testing an angular http service
- [Stack Overflow](https://stackoverflow.com/questions/59676310/get-element-by-attribute-name-angular-testing) - get element by attribute name angular testing