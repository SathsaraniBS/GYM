const asyncHandler = require('express-async-handler');
const Settings = require('../models/Settings');

// @desc    Get site settings
// @route   GET /api/settings
// @access  Public
const getSettings = asyncHandler(async (req, res) => {
    let settings = await Settings.findOne();

    if (!settings) {
        settings = await Settings.create({});
    }

    res.json(settings);
});

// @desc    Update site settings
// @route   PUT /api/settings
// @access  Private/Admin
const updateSettings = asyncHandler(async (req, res) => {
    let settings = await Settings.findOne();

    if (!settings) {
        settings = new Settings({});
    }

    settings.contactEmail = req.body.contactEmail || settings.contactEmail;
    settings.contactPhone = req.body.contactPhone || settings.contactPhone;
    settings.address = req.body.address || settings.address;
    settings.mapUrl = req.body.mapUrl || settings.mapUrl;
    settings.socialLinks = req.body.socialLinks || settings.socialLinks;
    settings.operationalHours = req.body.operationalHours || settings.operationalHours;
    settings.maintenanceMode = req.body.maintenanceMode !== undefined ? req.body.maintenanceMode : settings.maintenanceMode;

    // Handle email templates
    if (req.body.emailTemplates) {
        settings.emailTemplates = {
            bookingConfirmation: {
                subject: req.body.emailTemplates.bookingConfirmation?.subject || settings.emailTemplates?.bookingConfirmation?.subject,
                body: req.body.emailTemplates.bookingConfirmation?.body || settings.emailTemplates?.bookingConfirmation?.body
            },
            refundConfirmation: {
                subject: req.body.emailTemplates.refundConfirmation?.subject || settings.emailTemplates?.refundConfirmation?.subject,
                body: req.body.emailTemplates.refundConfirmation?.body || settings.emailTemplates?.refundConfirmation?.body
            }
        };
    }

    const updatedSettings = await settings.save();
    res.json(updatedSettings);
});

module.exports = {
    getSettings,
    updateSettings
};
