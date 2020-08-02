Documentation Mirrage.

The code has following layers:
1) Components - Front End Of Components Js (like nav bar, charts)
2) CSS - All CSS code
3) Database - All database calls and submitions
4) Logic - All functions and calculations
5) Pages - Pages (like Home, Login) containing front end components.

Flow of the code:
1) Home Page
    - User enters the name,
    - Transitions take place move to next div,
    - Enter date,
    - Transitions take place
    
    - Date entered is passed to numberOfDaysLived()
    - Number of days lived is returned by the function, is stored in this.state.number_of_days_lived
    
    - this.state.number_of_days_lived is passed to all the chart components, no other function in this Home.js file
2) Sounds Page
    - on this page same chart components are used
    - this.state.number_of_days_lived is passed through url ( for eg. this.state.number_of_days_lived = 22, so url is localhost3000/22 )
    - on this page same functions are used, 
    - 

Explanation Of Code By Page
1) Home Page
    - The name of the user is stored in this.state.user_name
    - Transitions:
        - enter : css animations from right to left
        - exit : css animations from right to left (same as above)
        - when submit is clicked, currently displayed div is given classname:'exit', proceeding div is given classname:'enter'
    - On name submission:
        - div containig name input is set to classname:'exit' and div containing date input is set to classname:'enter'
    - On date submission 
        - div containing date input is set to classname:'exit' and and dic containing charts is set to classname:'enter'
        - the input (stored in this.state.dob) is passed to NumberOfDaysLived() which returns number of days lived by the user.
    - 
