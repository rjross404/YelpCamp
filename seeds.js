var mongoose 	= require("mongoose"),
	Camp 		= require("./models/camp"),
	Comment 	= require("./models/comment")
 
var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        desc: "Augur halving few safe shitcoin since Golem rejoins the instamine for lots of bear trap, but Dash cost the bear trap. Blockchain waited few hashrate during lots of distributed denial of service attack. ERC20 token standard rejoins few burned price! Ontology threw away some provably fair stale block until lots of difficulty, therefore, it limited the hot bubble since Ethereum formed many volume!"
    },
    {
        name: "Desert Mesa", 
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        desc: "Although NFT serves few dust transaction at a shitcoin, Dogecoin based on some hot ERC20 token standard, so Silk Road launched the lightning fast segregated witness until lots of double spend! EOS waited lots of dump until some decentralisation, so Augur identified lots of peer-to-peer instamine after a hard fork. Zcash detected lots of dormant bubble until few crypto, so ICO returns few deterministic wallet in few cold wallet. Because Cardano cooperated the block reward after few blockchain, Binance Coin looked at some permissioned ledger until some crypto, and Litecoin specialises in a altcoin until some FOMO!"
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        desc: "ERC20 token standard looked at lots of validator in lots of public key, yet TRON allowed many quick IPO! Golem limited the proof of work until a dust transaction because SHA 256 data mining many quick hashrate in some address! Digitex Futures thought few quick address, and since NEO slept on some deterministic wallet for a hashrate, Silk Road surrendered lots of initial coin offering. Tether counted a burned token generation event although Solidity returns the lightning fast multi signature during the private key!"
    }
]
 
function seedDB(){
   //Remove all campgrounds
   Camp.remove({}, function(error){
        if(error){ console.log(error) }
        console.log("Removed campgrounds.")
					Comment.remove({}, function(error) {
					if(error){ console.log(error) }
					console.log("Removed comments.")
					//add a few campgrounds
					data.forEach(function(seed){
					Camp.create(seed, function(error, camp){
					if(error){ console.log(error) } 
					else {
					console.log("Added a campground.")
                        // create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was dougnuts.",
                                author: "Homer"
                            }, function(error, comment){
                                if(error){ console.log(error) } 
    else {
                                    camp.comments.push(comment)
                                    camp.save()
                                    console.log("Created new comment.")
                                }
                            })
                    }
                })
            })
        })
    })
}
 
module.exports = seedDB