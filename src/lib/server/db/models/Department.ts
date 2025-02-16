import mongoose, { Schema } from 'mongoose';

const DepartmentSchema: Schema = new Schema({
	code: { type: String, required: true, unique: true },
	name: { type: Map, of: String, required: true }
});

export interface IDepartment extends mongoose.Document {
	/**
	 * The code of the Department.
	 */
	code: string;

	/**
	 * The name of the Department.
	 */
	name: { [key: string]: string };
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IDepartmentModel
	extends mongoose.Model<IDepartment, NonNullable<unknown>, IDepartmentMethods> {
	// Static methods go here
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IDepartmentMethods {
	// Instance methods go here
}

// Create the Session model
let Department: IDepartmentModel;

try {
	Department = mongoose.model<IDepartment, IDepartmentModel>('Department', DepartmentSchema);
} catch (e) {
	if (e instanceof mongoose.Error.OverwriteModelError)
		if (import.meta.env.MODE === 'development') {
			console.debug('Reloading model for Department because in development.');
			Department = mongoose.model<IDepartment, IDepartmentModel>(
				'Department',
				DepartmentSchema,
				undefined,
				{
					overwriteModels: true
				}
			);
		} else Department = mongoose.model<IDepartment, IDepartmentModel>('Department');
	else throw e;
}

export default Department;
