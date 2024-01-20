### TEAM PROJECT
**Participants:**  
- Jagłowski Bartosz  
- Nebeskyi Illia  

#### Project Goal:  
Creation of a web application - AddAuction Portal

---

#### Features of the Application:  
##### Basic Assumptions:  
- The application allows registered users to participate in auctions and bidding.  
- During registration or ordering, the user provides their shipping information.  
- The user has the possibility to create a new auction.  

##### Items Requiring Further Discussion:  
**Payment System:**  
- After confirming the sale, the system sends the buyer the account number, title, and transfer amount.  
- The buyer (by default) sends the money to the transaction service, which then informs the seller of the need to ship the goods and subsequently sends the money to the seller.  
- Simplified imitation of the payment system - by confirming the desire to purchase, the buyer informs the application server, which then informs the seller.  

##### Additional Features:  
- The user has the option to browse offers from sellers in a selected area.  
- The application sends email messages confirming registration and the purchase/sale of goods.  
- The buyer has the possibility to chat with the seller.  
- The application provides statistics related to auctions and other traffic on the web application.  
- The application development process will be supported by automated unit tests (Continuous Integration).  

---

#### Selected Technologies:  
- Django Web Framework  
- React  
- MySQL  
- Docker  
