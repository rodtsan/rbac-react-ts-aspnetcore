﻿namespace RS_Services_API.Commands.Models
{
	public class UpdateProfileModel
	{
        public Guid ProfileId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Website { get; set; }
        public string PictureUrl { get; set; }
        public string CompanyName { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string StateCode { get; set; }
        public string CountryCode { get; set; }
        public string PostalCode { get; set; }
        public DateTime? BirthDate { get; set; }
    }
}
