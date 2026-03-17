import Dexie from "dexie";

export const db = new Dexie("todo-photos");

db.version(1).stores({
  photos: "id" // primary key
});

// Save photo
export async function addPhoto(id, imgSrc) {
  console.log("Saving photo for", id);

  await db.photos.put({
    id: id,
    imgSrc: imgSrc
  });

  console.log("Saved!");
}

// Load photo
export async function GetPhotoSrc(id) {
  console.log("Loading photo for", id);

  const record = await db.photos.get(id);

  return record ? record.imgSrc : null;
}
