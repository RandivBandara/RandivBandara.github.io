document.addEventListener("alpine:init", () => {
  Alpine.data("hotel_app", () => ({
    user: {
      name: "Randiv",
      mobile: "0772697405",
    },

    price: {
      adult: 2000,
      child: 1000,
      adults_local: 1000,
      children_local: 500,
      adults_foreign: 2000,
      children_foreign: 1000,
    },

    // room predefined prices
    room_price: {
      adult: 1000,
      child: 500,
      room_type: {
        single: 1000,
        double: 2000,
        triple: 3000,
      },
    },

    //  current room booking data
    room_booking: {
      roomTotal: 0,
      num_of_adults: 0,
      roomtype: "",
      checkin_date: "",
      checkout_date: "",
      num_of_rooms: 0,
      extra_requirements: "",
    },

    checkout_booking: {
      promo_code: "",
      full_name: "",
      email: "",
      mobile: "",
      address: "",
      city: "",
      country: "",
      postal_code: "",
      card_number: "",
      card_holder: "",
      expiry_date: "",
    },

    adventure_booking: {
      price: {
        add_guide: 2000,
        adults_local: 1000,
        children_local: 500,
        adults_foreign: 2000,
        children_foreign: 1000,
      },
      adventure_type: "",
      num_of_adults_local: "",
      num_of_children_local: "",
      num_of_adults_foreign: "",
      num_of_children_foreign: "",
      add_guide: "",
    },

    get total_adventure_price() {
      let total = 0;
      total +=
        this.adventure_booking.num_of_adults_local *
          this.adventure_booking.price.adults_local +
        this.adventure_booking.num_of_children_local *
          this.adventure_booking.price.children_local;
      total +=
        this.adventure_booking.num_of_adults_foreign *
          this.adventure_booking.price.adults_foreign +
        this.adventure_booking.num_of_children_foreign *
          this.adventure_booking.price.children_foreign;
      if (this.adventure_booking.add_guide == "yes") {
        total += this.adventure_booking.price.add_guide;
      }
      return total;
    },
    get total_room_price() {
      let total = 0;
      if (this.room_booking.roomtype == "single") {
        total =
          this.room_booking.num_of_adults * this.room_price.single +
          this.room_booking.num_of_children * this.room_price.child;
      } else if (this.room_booking.roomtype == "double") {
        total =
          this.room_booking.num_of_adults * this.room_price.double +
          this.room_booking.num_of_children * this.room_price.child;
      } else if (this.room_booking.roomtype == "triple") {
        total =
          this.room_booking.num_of_adults * this.room_price.triple +
          this.room_booking.num_of_children * this.room_price.child;
      }
      return total * this.room_booking.duration_of_stay; // Update to consider the duration of stay
    },

    get total_price() {
      return this.total_adventure_price + this.total_room_price;
    },

    //new lines
    get total_cost() {
      const adventurePrice = this.total_adventure_price;
      const roomPrice = this.total_room_price;

      // console.log("Adventure Price:", adventurePrice);
      // console.log("Room Price:", roomPrice);

      const totalCost = adventurePrice + roomPrice;

      // console.log("Total Cost:", totalCost);

      return totalCost;
    },

    get final_total() {
      const totalCost = this.total_cost;
      const totalDiscount = this.room_booking.total_discount;

      // console.log("Total Cost for Final Total:", totalCost);
      // console.log("Total Discount:", totalDiscount);

      const finalTotal = totalCost - totalDiscount;

      // console.log("Final Total:", finalTotal);

      return finalTotal;
    },

    favorite: [],
    bookedData: [],

    loyality_points: 0,

    roomPriceUpdate() {
      let adult_total = this.room_booking.num_of_adults * this.room_price.adult;
      let room_type_total = 0;
      if (this.room_booking.roomtype === "single") {
        room_type_total =
          this.room_booking.num_of_rooms * this.room_price.room_type.single;
      }
      if (this.room_booking.roomtype === "double") {
        room_type_total =
          this.room_booking.num_of_rooms * this.room_price.room_type.double;
      }
      if (this.room_booking.roomtype === "triple") {
        room_type_total =
          this.room_booking.num_of_rooms * this.room_price.room_type.triple;
      } else {
      }

      // total count
      this.room_booking.roomTotal = adult_total + room_type_total;
    },

    adventurePriceUpdate() {
      let adult_total =
        this.adventure_booking.num_of_adults_local *
        this.adventure_booking.price.adults_local;
      let child_total =
        this.adventure_booking.num_of_children_local *
        this.adventure_booking.price.children_local;
      let guide_total = 0;
      if (this.adventure_booking.add_guide == "yes") {
        guide_total = this.adventure_booking.price.add_guide;
      }

      // total count
      this.adventure_booking.total = adult_total + child_total + guide_total;
    },

    adventure_book() {
      this.adventurePriceUpdate();
      if (this.adventure_booking.adventure_type == "") {
        alert("invalid adventure type");
        return;
      }
      if (this.adventure_booking.num_of_adults_local < 0) {
        alert("invalid adult count");
        return;
      }
      if (this.adventure_booking.num_of_children_local < 0) {
        alert("invalid child count");
        return;
      }

      if (this.adventure_booking.num_of_adults_foreign < 0) {
        alert("invalid adult count");
        return;
      }
      if (this.adventure_booking.num_of_children_foreign < 0) {
        alert("invalid child count");
        return;
      }

      this.bookedData.push(this.adventure_booking);
      this.updateData("booking_details", this.bookedData);

      this.adventure_booking.num_of_adults_local = 0;
    },

    room_book() {
      this.roomPriceUpdate();

      if (this.room_booking.adults < 0) {
        alert("invalid adult count");
        return;
      }
      if (this.room_booking.children < 0) {
        alert("invalid child count");
        return;
      }
      if (this.room_booking.num_of_rooms <= 0) {
        alert("invalid room count");
        return;
      }
      if (this.room_booking.checkin_date == "") {
        alert("invalid checkin date");
        return;
      }
      if (this.room_booking.checkout_date == "") {
        alert("invalid checkout date");
        return;
      }

      if (this.room_booking.roomtype == "") {
        alert("invalid room type");
        return;
      }

      if (this.room_booking.num_of_rooms > 2) {
        this.loyality_points += 10;
      }

      //loyalty points
      localStorage.setItem("loyality_points", this.loyality_points);

      this.bookedData.push(this.room_booking);
      this.updateData("booking_details", this.bookedData);

      this.room_booking.adults = 0;
    },

    //new lines/ duration of stay
    get stay_duration() {
      if (this.room_booking.checkin_date && this.room_booking.checkout_date) {
        const checkinDate = new Date(this.room_booking.checkin_date);
        const checkoutDate = new Date(this.room_booking.checkout_date);
        const timeDifference = checkoutDate - checkinDate;
        return Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
      }
      return 0;
    },

    get historyBookings() {
      return this.getData("booking_history") || [];
    },

    get favoriteBookings() {
      return this.getData("favorite_bookings") || [];
    },

    updateData(name, data) {
      localStorage.setItem(name, JSON.stringify(data));
    },

    removeData(name) {
      localStorage.removeItem(name);
    },

    getData(name) {
      return JSON.parse(localStorage.getItem(name));
    },

    addFavorite() {
      this.favorite.push(this.room_booking);
      this.updateData("favorite_bookings", this.favorite);
      console.log("added");
    },

    printBookings() {
      let bookedData = this.getData("booking_details");
      console.log(bookedData);
    },

    getFavorite() {
      let favorite = this.getData("favorite_bookings");
      this.favorite = favorite;
    },

    loadFavoriteToUI() {
      this.getFavorite();

      const ul = document.getElementById("favoriteList");
      ul.innerHTML = "";

      this.favorite.forEach((element) => {
        ul.innerHTML += `<li>
                  <span>${element.checkin_date}</span>
                  <span>${element.checkout_date}</span>
                  <span>${element.num_of_adults}</span>
                  <span>${element.num_of_rooms}</span>
              </li>`;
      });
    },

    getBookings() {
      let bookings = this.getData("booking_details");
      this.bookedData = bookings;
    },

    loadBookingsToUI() {
      this.getBookings();

      const ul = document.getElementById("bookingList");
      ul.innerHTML = "";

      this.bookedData.forEach((element) => {
        ul.innerHTML += `<li>
                            <span>${element.roomTotal}</span>
                            <span>${element.adventureTotal}</span>
                            <span>${element.roomTotal}</span>
                            <span>${element.roomTotal}</span>

                        </li>`;
      });
    },

    printPrice() {
      console.log(this.room_booking.price);
    },
  }));
});
