const axios = require('axios');
const db = require("../database/db");

function printNearestUpcomingDay() {
    const today = new Date();

    // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const currentDayOfWeek = today.getDay();

    // Calculate the difference between today and the upcoming Wednesday
    const daysUntilWednesday = (3 - currentDayOfWeek + 7) % 7;
    const daysUntilSaturday = (6 - currentDayOfWeek + 7) % 7;

    if (daysUntilWednesday < daysUntilSaturday) {
        const upcomingWednesday = new Date(today);
        upcomingWednesday.setDate(today.getDate() + daysUntilWednesday);
        return formatDate(upcomingWednesday);
    } else {
        const upcomingSaturday = new Date(today);
        upcomingSaturday.setDate(today.getDate() + daysUntilSaturday);
        return formatDate(upcomingSaturday);
    }
}

function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
}

const UpcomingDemoDate = printNearestUpcomingDay();

const LatestLead = {
    facebookLead: function() {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://graph.facebook.com/v13.0/act_243266715363264/ads?fields=name,leads&access_token=EAAcjeA15ZCR4BO82yLxVyqZBmjTdXTv7jRsxCNZCZAYYrpQIo7mKo6SletK75cJxDNKyH2PQoDDrReTHfPClz0JtxcM2wcptyQ13y2Vii216WqEEviFIBzEK6KNXa8n6hoEBZBjnFpdFVin3IjYc4CaFvmPyjJeYDi3YzoDcNaz356GGBSLG70iUNftsZAvRCj',
            headers: { }
        };

        return axios.request(config)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.error('An error occurred:', error);
            });
    },

    WebisteLead: function(){

        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: 'https://legalstixlawschool.com/api/currentlead',
          headers: { }
        };
        
        return axios.request(config)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error('An error occurred:', error);
        });
        
    },

    getLatestLead: function(cb){
            let prom = new Promise((resolve, reject) => {
                   db.query(`select * from latest_leads WHERE IsCompleted='0'`, (err, results) => {
                   if(!err){
                        resolve(results);
                   }
                })
            })

            prom.then((data) => {
                 return cb(data);
            })
    },

    InsertLatestLead: function() {
        return Promise.all([this.facebookLead(), this.WebisteLead()]).then((data) => {
                   let fbLead = data[0];

                   let fbnewData = [];
                   fbLead.data.map(item => {
                        let category = item.name;

                        item?.leads?.data.map(value => {
                            if(new Date(value.created_time).toLocaleDateString() == new Date().toLocaleDateString()){
                               let name = (value.field_data[0].values[0]);
                               let phone = value.field_data[2].values[0].replace(["+91"], '');
                               if(phone.includes("com")){
                                    phone = value.field_data[1].values[0].replace(["+91"], '');
                               }
                               let lead_id = value.id;
                               let email = "";
                               if(value.field_data[3].name == "email"){
                                        email = value.field_data[3].values[0];
                               }else{
                                        email = value.field_data[2].values[0];
                               }

                               fbnewData.push({name, phone, lead_id: +lead_id, category, email})
                            }
                        })
                   })

                   let webData = data[1];
                   webData.CurrentLead.map(item => {
                       let name = item.name;
                       let phone = item.phone;
                       let category = item.studymaterial;
                       let lead_id = item.id
                       let email = item.email;
                       fbnewData.push({name, phone, lead_id, category, email})
                   });

                   let ids = [];
                   fbnewData.forEach(item => {
                       ids.push(item.lead_id)
                    })

                   ids = ids.join(",");
        
                    let latest_lead = [];
                    fbnewData.forEach(item => {
                            let id = item.lead_id;
                            db.query(`select * from latest_leads WHERE lead_id = ${id}`, (err, res) => {
                                if(!err && res.length == 0){
                                        latest_lead.push(item);
                                        db.query(`INSERT INTO latest_leads(name, lead_id, category, phone, status, IsCompleted, demo_date, created_at, email)
                                                    VALUES ('${item.name}', '${item.lead_id}', '${item.category}', '${item.phone}', '1', 0, '${UpcomingDemoDate}', CURRENT_TIMESTAMP, '${item.email}')`, (err, result) => {
                                                })
                                }
                            })
                        })
              })
    }
}


module.exports = LatestLead;