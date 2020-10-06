require("../config/db.config");
const User = require("../models/User.model");
const Product = require("../models/Product.model");
const Review = require("../models/Review.model");
const faker = require("faker");

const userIds = [];
const userN = 30;
const productN = 5;

Promise.all([
  User.deleteMany(), 
  Product.deleteMany(),
  Review.deleteMany()
])
  .then(() => {
    for (let i = 0; i < userN; i++) {
      const user = new User({
        email: faker.internet.email(),
        password: "1234567890",
        name: faker.name.findName(),
        address: faker.address.streetAddress(),
      });
      console.log(user)

      user
        .save()
        .then((u) => {
          userIds.push(u._id);

          for (let i = 0; i < productN; i++) {
            const product = new Product({
              name: faker.commerce.productName(),
              description: faker.lorem.paragraph(),
              price: faker.commerce.price(),
              user: u._id,
            });

            product
              .save()
              .then((p) => {
                for (let i = 0; i < 3; i++) {
                  const filteredUserIds = userIds.filter( id => id !== u._id);
                  const randomUserId = filteredUserIds[Math.floor(Math.random() * filteredUserIds.length)]

                  const review = new Review({
                    title: faker.lorem.words(),
                    description: faker.lorem.paragraph(),
                    score: Math.ceil(Math.random() * 5),
                    product: p._id,
                    user: Object(randomUserId)
                  })

                  review.save()
                    .then()
                    .catch((e) => console.log(e));
                }
              })
              .catch((e) => console.log(e));
          }
        })
        .catch((e) => console.log(e));
    }
  })
  .catch((e) => console.log(e));
