import Block from '../models/Block.model.js';
import User from '../models/User.model.js';
import { validateDescription, validateProgress, validateDates, validateRequiredFields } from '../utils/block.validations.js';


// Create new block
const createBlock = async (req, res) => {
  let { description, startDate, endDate, progress } = req.body;
  const user = req.user._id;
  progress = +progress;
  description = description.trim();

  // Validate - falsy attributes
  const requiredFieldError = validateRequiredFields(description, startDate, endDate, progress);
  if (requiredFieldError) return res.status(400).json({ error: requiredFieldError });

  // Validate - Description
  const descriptionError = validateDescription(description);
  if (descriptionError) return res.status(400).json({ error: descriptionError });

  // Validate progress
  const progressError = validateProgress(progress);
  if (progressError) return res.status(400).json({ error: progressError });

  // Validate dates
  const datesError = validateDates(startDate, endDate);
  if (datesError) return res.status(400).json({ error: datesError });

  let block, loggedUser;

  try {
    block = await Block.findOne({ description: { $regex: new RegExp(`^${description}$`, 'i') } });
    if (block) return res.status(409).json({ error: 'Duplicate Block description' });

    block = new Block({ description, startDate, endDate, progress, user });
    loggedUser = await User.findById(user);
    loggedUser.blocks.push(block._id);
    await Promise.all([block.save(), loggedUser.save()]);

    return res.status(201).json({ success: 'block has been successfully created' });

  } catch (error) {
    return res.status(500).json({ error: error.message, message: 'cannot create block - block.controller' });
  };
};

// Get user blocks
const getUserBlocks = async (req, res) => {
  const userId = req.user._id;
  try {
    const userBlocks = await User.findById(userId).populate('blocks');
    let blocks = userBlocks.blocks.length > 0 ? userBlocks.blocks : [];
    return res.status(200).json({ blocks });
  } catch (error) {
    return res.status(500).json({ error: error.message, message: 'cannot retrieve blocks - getUserBlock - block.controller' });
  };
};


// Update a block
const updateUserBlock = async (req, res) => {
  let { startDate, endDate, progress } = req.body;
  progress = +progress;

  // Validate - falsy attributes
  if (!startDate || !endDate || progress === null || isNaN(progress)) return res.status(400).json({ error: 'Missing required field/s - progress must be a number' });

  // Validate progress
  const progressError = validateProgress(progress);
  if (progressError) return res.status(400).json({ error: progressError });

  // Validate dates
  const datesError = validateDates(startDate, endDate);
  if (datesError) return res.status(400).json({ error: datesError });
  try {
    const { id } = req.params;
    const block = await Block.findById(id);
    if (!block) return res.status(404).json({ error: error.message, message: 'Block does not exist' });
    if (block.progress > progress) return res.status(400).json({ error: 'new progress value must be equal or greater than current one' });

    // Update block fields
    block.startDate = startDate || block.startDate;
    block.endDate = endDate || block.endDate;
    block.progress = progress || block.progress;

    const updatedBlock = await block.save();
    return res.status(200).json({ success: 'Block has been successfully updated', updatedBlock });
  } catch (error) {
    return res.status(500).json({ error: error.message, message: 'Cannot update block - block.controller' });
  };
};


const deleteBlock = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  try {
    const deletedBlock = await Block.findByIdAndDelete(id);
    if (!deletedBlock) return res.status(404).json({ error: 'Block not found' });
    await User.updateOne(
      { _id: userId },
      { $pull: { blocks: id } }
    );
    return res.status(200).json({ success: 'Block successfully deleted', block: deletedBlock });

  } catch (error) {
    return res.status(500).json({ error: error.message, message: 'Cannot delete block - cannot update user - block.controller' });
  };
};

// Get all blocks
const getAllBlocks = async (req, res) => {
  return await Block.find();
};




export { createBlock, getUserBlocks, updateUserBlock, deleteBlock }