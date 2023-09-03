const getData = async (rsslink) => {
  try {
    const rssFeed = await fetch(
      "https://api.rss2json.com/v1/api.json?rss_url=" + rsslink
    );
    if (rssFeed.ok) {
      const response = await rssFeed.json();
      return response;
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
};

function addAccordion(magazines) {
  //get accordion container
  accCont = document.getElementById("accordionContainer");

  //create accordion
  const accordionStruct = document.createElement("div");
  accordionStruct.classList.add("accordion");
  accordionStruct.id = "accordionMain";
  accCont.appendChild(accordionStruct);

  //get accordion
  const accordionMain = document.getElementById("accordionMain");

  magazines.forEach((Element, index) => {
    //create accordion body
    const accordionEle = document.createElement("div");
    accordionEle.classList.add("accordion-item");

    //condition to keep the 1st accordion expanded
    if (index == 0) {
      accordionEle.innerHTML = `
            

                <h2 class="accordion-header" id="heading${index}">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}" id="button${index}">            
                    </button>
                </h2>
                    <div id="collapse${index}" class="accordion-collapse show" aria-labelledby="heading${index}" data-bs-parent="#accordionMain">

                    <div class="accordion-body" id="accordion-body${index}">
                        
                    </div>

                </div>

           
            `;
    } else {
      accordionEle.classList.add("mt-3");
      accordionEle.innerHTML = `
            
                <h2 class="accordion-header" id="heading${index}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}" id="button${index}">
                        
                    </button>
                </h2>
                    <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#accordionMain">

                    <div class="accordion-body" id="accordion-body${index}">
                        
                    </div>

                </div>

            
            `;
    }
    //append accordion body to accordion
    accordionMain.appendChild(accordionEle);
  });
}

function addCarousel(magazines) {
  magazines.forEach(async (link, index) => {
    //get url from magazines
    const urlMain = await getData(magazines[index]);

    //adding Title to accordion header
    document.getElementById(
      `button${index}`
    ).innerText = `${urlMain.feed.title}`;

    //add carousel outer structure
    const carouselOuter = document.createElement("div");
    carouselOuter.classList.add("carousel", "slide");
    carouselOuter.id = `carouselExampleControls${index}`;

    carouselOuter.innerHTML = `
        <div class="carousel-inner" id="carouselInner${index}">
            
        </div>

        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls${index}" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls${index}" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
        `;

    //append carousel outer structure to the accordion
    document
      .getElementById(`accordion-body${index}`)
      .appendChild(carouselOuter);
    //get each topic item in the url
    const cards = urlMain.items;

    cards.forEach((item, _index) => {
      //create card
      const card = document.createElement("div");
      card.classList.add("carousel-item");

      //display the 1st card of each items Array
      if (_index == 0) {
        card.classList.add("active");
      }

      //get publish date in proper format
      const publishDate = new Date(item.pubDate).toLocaleDateString();

      //create card
      card.innerHTML = `
                    <div class="card">
                        <img src="${item.enclosure.link}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <a href="${item.link}" class="card-title">${item.title}</a>
                            <h6 class="card-subheading" style"color:grey; opacity:0.75;">${item.author} : ${publishDate}</h6>                           
                            <p class="card-text">${item.description}</p>
                        </div>
                    </div>
                        
            `;
      //append card to carouselInner
      document.getElementById(`carouselInner${index}`).appendChild(card);
    });
  });
}

addAccordion(magazines);
addCarousel(magazines);
