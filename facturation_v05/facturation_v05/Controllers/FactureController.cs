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
    public class FactureController : ApiController
    {
        private FacturationBDD_v02Entities db = new FacturationBDD_v02Entities();

        // GET: api/Facture
        public IQueryable<Facture> GetFacture()
        {
            return db.Facture;
        }

        // GET: api/Facture/5
        [ResponseType(typeof(Facture))]
        public IHttpActionResult GetFacture(int id)
        {
            Facture facture = db.Facture.Find(id);
            if (facture == null)
            {
                return NotFound();
            }

            return Ok(facture);
        }

        // PUT: api/Facture/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutFacture(int id, Facture facture)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != facture.fact_id)
            {
                return BadRequest();
            }

            db.Entry(facture).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FactureExists(id))
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

        // POST: api/Facture
        [ResponseType(typeof(Facture))]
        public IHttpActionResult PostFacture(Facture facture)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Facture.Add(facture);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = facture.fact_id }, facture);
        }

        // DELETE: api/Facture/5
        [ResponseType(typeof(Facture))]
        public IHttpActionResult DeleteFacture(int id)
        {
            Facture facture = db.Facture.Find(id);
            if (facture == null)
            {
                return NotFound();
            }

            db.Facture.Remove(facture);
            db.SaveChanges();

            return Ok(facture);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool FactureExists(int id)
        {
            return db.Facture.Count(e => e.fact_id == id) > 0;
        }
    }
}