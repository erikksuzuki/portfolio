import { z } from "zod";

export enum HomeType {
  SingleFamilyDetached = "Single Family Detached",
  SingleFamilyAttached = "Single Family Attached",
  Condominium = "Condominium",
  Townhouse = "Townhouse",
  MultiFamily = "Multi Family",
  MobileHome = "Mobile Home",
  Other = "Other",
}

export enum ConstructionMaterial {
  Brick = "Brick",
  Wood = "Wood",
  VinylSiding = "Vinyl Siding",
  Stucco = "Stucco",
  Concrete = "Concrete",
  Steel = "Steel",
  Other = "Other",
}

export enum RoofType {
  AsphaltShingles = "Asphalt Shingles",
  Metal = "Metal",
  Tile = "Tile",
  Slate = "Slate",
  WoodShingles = "Wood Shingles",
  Other = "Other",
}

export enum SecurityFeature {
  SmokeDetectors = "Smoke Detectors",
  BurglarAlarm = "Burglar Alarm",
  DeadboltLocks = "Deadbolt Locks",
  SecurityCameras = "Security Cameras",
  FireExtinguisher = "Fire Extinguisher",
  None = "None",
}

export enum OccupancyStatus {
  OwnerOccupied = "Owner Occupied",
  Tenant = "Tenant",
  Vacant = "Vacant",
  Seasonal = "Seasonal",
  Other = "Other",
}

export enum ResidenceType {
  PrimaryResidence = "Primary Residence",
  SecondaryResidence = "Secondary Residence",
  RentalProperty = "Rental Property",
  VacationHome = "Vacation Home",
  Other = "Other",
}

export enum PetType {
  None = "None",
  Dog = "Dog",
  Cat = "Cat",
  Exotic = "Exotic",
  Other = "Other",
}

// PROOF OF LOSS

// Occupancy type of the insured property at time of loss
export enum Occupancy {
  OwnerOccupied = "Owner Occupied",
  TenantOccupied = "Tenant Occupied",
  Vacant = "Vacant",
  UnderRenovation = "Under Renovation",
  SeasonalUse = "Seasonal Use",
  Other = "Other",
}

// The insured's interest in the property
export enum InsuredInterest {
  FullOwnership = "Full Ownership",
  PartialOwnership = "Partial Ownership",
  Mortgagee = "Mortgagee",
  Leaseholder = "Leaseholder",
  Other = "Other",
}

// Other individuals or entities with interest in the property
export enum OtherInterests {
  None = "None",
  MortgageLender = "Mortgage Lender",
  CoOwner = "Co Owner",
  Tenant = "Tenant",
  Unknown = "Unknown",
  Other = "Other",
}

// Cause of the loss event
export enum CauseOfLoss {
  Fire = "Fire",
  ElectricalFire = "Electrical Fire",
  WaterDamage = "Water Damage",
  Theft = "Theft",
  Vandalism = "Vandalism",
  NaturalDisaster = "Natural Disaster",
  Other = "Other",
}

export const insuranceClaimSchema = z.object({
  policyNumber: z.string(),
  fileNumber: z.string(),
  amountOfPolicyAtTimeOfLoss: z.number(),
  companyClaimNumber: z.string(),
  dateIssued: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, "MM/DD/YYYY format"),
  dateExpires: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, "MM/DD/YYYY format"),
  agent: z.string(),
  agencyAt: z.string(),
  insuranceCompany: z.string(),
  insuranceCompanyAddress: z.string(),
  insuredPropertyAddress: z.string(),

  causeOfLoss: z.nativeEnum(CauseOfLoss),

  timeOfLoss: z.object({
    hour: z.string(), // could also use regex if needed
    period: z.enum(["AM", "PM"]),
    day: z.number().int().min(1).max(31),
    month: z.string(),
    year: z.number().int(),
    origin: z.string(),
  }),

  occupancy: z.nativeEnum(Occupancy),

  titleAndInterest: z.object({
    insuredInterest: z.nativeEnum(InsuredInterest),
    otherInterests: z.nativeEnum(OtherInterests),
  }),

  changesSincePolicyIssued: z.string(),

  totalInsurance: z.number(),

  otherInsuranceContracts: z.string(),

  value: z.object({
    actualCashValue: z.number(),
    wholeLossAndDamage: z.number(),
    amountClaimed: z.number(),
  }),

  statementOfInsured: z.object({
    noFraudulentActivity: z.boolean(),
    noPolicyViolations: z.boolean(),
    propertyStatus: z.string(),
    additionalInformationWillBeProvided: z.boolean(),
  }),

  jurisdiction: z.object({
    state: z.string(),
    county: z.string(),
  }),

  signature: z.object({
    insured: z.string(),
    dateSigned: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "YYYY-MM-DD format"),
    notaryPublicSignatureExists: z.boolean(),
  }),
});
