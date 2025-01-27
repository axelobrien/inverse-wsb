- a description of your project
This scrapes r/wallstreetbets and shorts every single stock mentioned
- Deployed application link: Not Applicable
- Screenshots/GIFs/demo video of your application
![image](https://github.com/user-attachments/assets/c3ca3a42-cede-4ea1-8785-52ffa18224b8)

- Setup instructions for running locally
- Setup a secrets.ts file with the Alpaca keys
- `npm i`
- `tsc -w`
- `node ./dist/inverseWSB.js`
- **Learning Journey**: A section describing:
    - What inspired you to create this project
      - A common meme on the r/wallstreetbets forum is that if you did the opposite of whatever they suggest that you'd be rich. So I decided to make this meme a reality and see if it is true.
    - What potential impact do you believe it could have on its intended users or the broader community
      - I think that this could be a fun tool for people on r/wallstreetbets to benchmark themselves against. I think people on the forum would get a good laugh if they saw that doing the opposite of what they suggest makes money.
    - What new technology you learned
      - Alpaca Trading API
    - Why you chose the new technology
      - I wanted a way to paper trade via an API, and this seemed like the best choice because it's simple and also allows for trading with real money if I found a strategy that worked.
    - Challenges you faced, and what you learned from the experience
      - A challenge I faced was getting the data from the forum. I decided that I didn't want to use an API to scrape because I wanted to see if I could do it myself. So I decided that I would just use the default javascript features to fetch data, then use regex to parse the html. The regex in particular proved to be a challenge, because stock tickers can vary in length and in how they are written. I learned a lot about how the http protocol works here, because I had to make sure that the requests I sent out were the same as would be from a browser, and I also learned some regex to parse the HTML.
