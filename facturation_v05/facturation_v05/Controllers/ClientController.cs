using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using facturation_v05.Models;

namespace facturation_v05.Controllers
{
    public class ClientController : ApiController
    {
        private FacturationBDD_v02Entities db = new FacturationBDD_v02Entities();

        public Client_details Client_details { get; private set; }

        // GET: api/Client
        public System.Object GetClient()
        {

            /*var result = (from a in db.Client
                          join b in db.Client_details  on a.client_id equals b.client_id
            
                          orderby a.client_id descending
                        
                          select new 
                          {
                              a.client_id,
                              a.client_nom,
                              a.client_siret,
                              a.client_adresse,
                              a.client_email,
                              a.client_TVA,
                              b.final_client_id,
                              b.final_client_nom
                          }).ToList();
            return result;*/


            var result = (from a in db.Client
                        
                          orderby a.client_id descending

                          select new
                          {
                              a.client_id,
                              a.client_nom,
                              a.client_siret,
                              a.client_adresse,
                              a.client_email,
                              a.client_TVA,
                              
                          }).ToList();
           
            return result;

        }




        /*  public System.Object GetOrders()
         {
             var result = (from a in db.Orders
                           join b in db.Customers on a.CustomerID equals b.CustomerID

                           select new
                           {
                               a.OrderID,
                               a.OrderNo,
                               Customer = b.Name,
                               a.PMethod,
                               a.GTotal
                           }).ToList();

             return result;
         }*/

        // GET: api/Client/5
        [ResponseType(typeof(Client))]
        public IHttpActionResult GetClient(int id)
        {
            /* Client client = db.Client.Find(id);
             if (client == null)
             {
                 return NotFound();
             }

             return Ok(client);*/
            var client = (from a in db.Client
                         where a.client_id == id

                         select new
                         {
                             a.client_id,
                             a.client_nom,
                             a.client_siret,
                             a.client_adresse,
                             a.client_email,
                             a.client_TVA,
                             DeletedDetailClientIDs=""
                         }).FirstOrDefault();
            var clientDetails = (from a in db.Client
                                 join b in db.Client_details on a.client_id equals b.client_id
                                 where a.client_id == id

                                select new
                                {
                                    a.client_id,
                                    b.client_detail_id,
                                    b.final_client_id,
                                    b.final_client_nom,
                                    b.client_mediator,
                                    b.client_adresse
                                }).ToList();

            return Ok(new { client, clientDetails });


        }



        /*   var order = (from a in db.Orders
                        where a.OrderID == id

                        select new
                        {
                            a.OrderID,
                            a.OrderNo,
                            a.CustomerID,
                            a.PMethod,
                            a.GTotal,
                            DeletedOrderItemIDs = ""
                        }).FirstOrDefault();

           var orderDetails = (from a in db.OrderItems
                               join b in db.Items on a.ItemID equals b.ItemID
                               where a.OrderID == id

                               select new
                               {
                                   a.OrderID,
                                   a.OrderItemID,
                                   a.ItemID,
                                   ItemName = b.Name,
                                   b.Price,
                                   a.Quantity,
                                   Total = a.Quantity * b.Price
                               }).ToList();

               return Ok(new { order, orderDetails });*/


        // PUT: api/Client/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutClient(int id, Client client)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != client.client_id)
            {
                return BadRequest();
            }

            db.Entry(client).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClientExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Client
        [ResponseType(typeof(Client))]
        public IHttpActionResult PostClient(Client client)
        {
            /* if (!ModelState.IsValid)
             {
                 return BadRequest(ModelState);
             }

             db.Client.Add(client);
             db.SaveChanges();

             return CreatedAtRoute("DefaultApi", new { id = client.client_id }, client);*/

            //table client
            try
            {
                //client table
                if (client.client_id == 0)
                    db.Client.Add(client);
                else
                    db.Entry(client).State = EntityState.Modified;
                // table clientDetails 
                foreach (var c in client.Client_details)
                {
                    if (c.client_detail_id == 0)
                        db.Client_details.Add(c);
                    else
                        db.Entry(c).State = EntityState.Modified;
                }

                //Delete For Table Détails client <3
                foreach (var id in client.DeletedDetailClientIDs.Split(',').Where(x => x!=""))
                {
                    Client_details x = db.Client_details.Find(Convert.ToInt32(id));
                    db.Client_details.Remove(x);
                }



                db.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {

                throw ex;
            }



        }/*
         try
            {
                //Order table
                if (order.OrderID == 0)
                    db.Orders.Add(order);
                else
                    db.Entry(order).State = EntityState.Modified;

                //OrderItems table
                foreach (var item in order.OrderItems)
                {
                    if (item.OrderItemID == 0)
                        db.OrderItems.Add(item);
                    else
                        db.Entry(item).State = EntityState.Modified;
                }

                //Delete for OrderItems
                foreach (var id in order.DeletedOrderItemIDs.Split(',').Where(x => x!=""))
                {
                    OrderItem x = db.OrderItems.Find(Convert.ToInt64(id));
                    db.OrderItems.Remove(x);
                }


                db.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        */

        // DELETE: api/Client/5
        [ResponseType(typeof(Client))]
        public IHttpActionResult DeleteClient(int id)
        {
            /* Client client = db.Client.Find(id);
             if (client == null)
             {
                 return NotFound();
             }

             db.Client.Remove(client);
             db.SaveChanges();

             return Ok(client);*/
            Client client = db.Client.Include(y => y.Client_details)
             .SingleOrDefault(x => x.client_id == id);

            foreach (var item in client.Client_details.ToList())
            {
                db.Client_details.Remove(item);
            }

            db.Client.Remove(client);
            db.SaveChanges();

            return Ok(client);
        }
        /*
          Order order = db.Orders.Include(y => y.OrderItems)
                .SingleOrDefault(x => x.OrderID == id);

            foreach (var item in order.OrderItems.ToList())
            {
                db.OrderItems.Remove(item);
            }

            db.Orders.Remove(order);
            db.SaveChanges();

            return Ok(order);*/

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ClientExists(int id)
        {
            return db.Client.Count(e => e.client_id == id) > 0;
        }
    }
}