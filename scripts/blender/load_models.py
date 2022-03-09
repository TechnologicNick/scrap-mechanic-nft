import bpy
import json
import os
import mathutils

def reset_blend():
    for bpy_data_iter in (
            bpy.data.armatures,
            bpy.data.images,
            bpy.data.materials,
            bpy.data.meshes,
            bpy.data.objects,
            bpy.data.textures,
    ):
        for id_data in bpy_data_iter:
            bpy_data_iter.remove(id_data, do_unlink=True)
            
reset_blend()

base_path = os.path.dirname([file for file in bpy.utils.blend_paths() if file.endswith(__file__)][0])



def apply_material(mat, modelMat):
    print(mat, modelMat)
    
    mat.use_nodes = True
    
    def load_image(pathToResolve):
        return bpy.data.images.load(os.path.join(base_path, '../assets', pathToResolve), check_existing=True)
    
    def add_texture_node(img):
        tex = mat.node_tree.nodes.new("ShaderNodeTexImage")
        tex.location = mathutils.Vector((-400, (len(mat.node_tree.nodes) - 4) * -300))
        tex.image = img
        return tex
    
    dif = add_texture_node(load_image(modelMat['textureList'][0]))
#    asg = add_texture_node(load_image(modelMat['textureList'][1]))
#    nor = add_texture_node(load_image(modelMat['textureList'][2]))
    
    print(dif)
    
    mat.node_tree.links.new(dif.outputs['Color'], mat.node_tree.nodes['Principled BSDF'].inputs['Base Color'])
    
    print(dif)
    
    


def load_model(model):
    bpy.ops.wm.collada_import(filepath=model['mesh'])
    
    # Reset scale of all objects
    for mesh in bpy.data.objects:
        mesh.scale = mathutils.Vector((1.0, 1.0, 1.0))
    
    # Apply materials
    if model['subMeshMap']:
        for matName in model['subMeshMap']:
            apply_material(bpy.data.materials[matName], model['subMeshMap'][matName])
    else:
        for modelMat in model['subMeshList']:
            apply_material(bpy.data.materials.values()[0], modelMat)
        





with open(os.path.join(base_path, '../assets/models.json')) as f:
    models = json.load(f)
    
for rend, model in models.items():
    load_model(model)
    break
        