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
    public class ContratController : ApiController
    {
        private FacturationBDD_v02Entities db = new FacturationBDD_v02Entities();

        // GET: api/Contrat
        public System.Object GetContrat()
        {
            
            var result = (from a in db.Contrat
                          join b in db.Client on a.client_id equals b.client_id
                          //  join c in db.Final_client on a.final_client_id equals c.final_client_id ==> pour afficher le nom de client final
                          orderby a.contrat_id descending
                          select new
                          {
                              a.contrat_id,
                              a.ref_contrat,
                              b.client_nom,
                             a.final_client_id,
                              a.description,
                              a.prix_unitaire,
                              a.date_debut,
                              a.date_fin
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




        // GET: api/Contrat/5
        [ResponseType(typeof(Contrat))]
        public IHttpActionResult GetContrat(int id)
        {
            Contrat contrat = db.Contrat.Find(id);
            if (contrat == null)
            {
                return NotFound();
            }

            return Ok(contrat);
        }

        // PUT: api/Contrat/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutContrat(int id, Contrat contrat)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != contrat.contrat_id)
            {
                return BadRequest();
            }

            db.Entry(contrat).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContratExists(id))
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

        // POST: api/Contrat
        [ResponseType(typeof(Contrat))]
        public IHttpActionResult PostContrat(Contrat contrat)
        {
            /* if (!ModelState.IsValid)
             {
                 return BadRequest(ModelState);
             }

             db.Contrat.Add(contrat);
             db.SaveChanges();

             return CreatedAtRoute("DefaultApi", new { id = contrat.contrat_id }, contrat);*/


            db.Contrat.Add(contrat);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = contrat.contrat_id }, contrat);
        }

        // DELETE: api/Contrat/5
        [ResponseType(typeof(Contrat))]
        public IHttpActionResult DeleteContrat(int id)
        {
            Contrat contrat = db.Contrat.Find(id);
            if (contrat == null)
            {
                return NotFound();
            }

            db.Contrat.Remove(contrat);
            db.SaveChanges();

            return Ok(contrat);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ContratExists(int id)
        {
            return db.Contrat.Count(e => e.contrat_id == id) > 0;
        }
    }
}